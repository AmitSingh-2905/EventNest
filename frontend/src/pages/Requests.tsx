import { useEffect, useState } from "react"
import Button from "../UI/Button"
import Header from "../UI/components/Header"
import MainContent from "../UI/components/MainContent"
import Sidebar from "../UI/components/Sidebar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import RequestsCard from "../UI/components/Cards/ModCards/RequestsCard"
import Modal from "../UI/components/Modal"
import Alert from "../UI/components/Alert"
import { useNavigate } from "react-router-dom"
import logout from "../functions/logout"

const Requests = ({ person }: { person: "moderator" }) => {
    const navigate = useNavigate()

    const [requests, setRequests] = useState<any[]>([])
    const [openErrModal, setOpenErrModal] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)

    async function getRequests() {
        try {
            const res = await axios.get(BACKEND_URL + "/api/v1/moderator/requests", {
                headers: {
                    authorization: localStorage.getItem("token"),
                    type: person
                }
            })
            setRequests(e => e = res.data.requests)
        } catch (err: any) {
            const errMsg = err.response.data.message
            setOpenErrModal(e => e = errMsg)
        }
    }

    async function onApprove(e: any) {
        try {
            setLoading(e => e = true)
            const id = e.target?.closest(".container").id
            await axios.put(BACKEND_URL + `/api/v1/moderator/requests/manage/${id}`, { action: "approve" }, {
                headers: {
                    authorization: localStorage.getItem("token"),
                    type: person
                }
            })
        } catch (err: any) {
            const errMsg = err.response.data.message
            setOpenErrModal(e => e = errMsg)
        } finally {
            setLoading(e => e = false)
        }
    }

    async function onReject(e: any) {
        try {
            setLoading(e => e = true)
            const id = e.target?.closest(".container").id
            await axios.put(BACKEND_URL + `/api/v1/moderator/requests/manage/${id}`, { action: "reject" }, {
                headers: {
                    authorization: localStorage.getItem("token"),
                    type: person
                }
            })
        } catch (err: any) {
            const errMsg = err.response.data.message
            setOpenErrModal(e => e = errMsg)
        } finally {
            setLoading(e => e = false)
        }
    }

    useEffect(() => {
        getRequests()
    }, [loading])

    return <div className="w-full h-full">

        {openErrModal && <Modal z_index={"z-5"} open={openErrModal} onClose={() => setOpenErrModal(e => e = undefined)}>
            <Alert msg={openErrModal} />
        </Modal>}

        <Sidebar person={person} />
        <MainContent>
            <>
                <Header>
                    <div className="flex justify-center gap-2 items-center">
                        <Button onClick={() => logout(navigate, person)} variant="delete" text="Logout" />
                    </div>
                </Header>
                <div className="flex flex-col pl-5">
                    {/* admin Requests */}
                    {requests.map((request, key) => {
                        return (
                            <RequestsCard
                                key={key}
                                id={request._id}
                                fname={request.firstname}
                                lname={request.lastname}
                                email={request.email}
                                college={request.college}
                                society={request.society}
                                proof_link={request.identity_proof}
                                onApprove={onApprove}
                                onReject={onReject}
                                loading={loading}
                            />
                        )
                    })}
                </div>
            </>
        </MainContent>
    </div>
}
export default Requests