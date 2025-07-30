import { useEffect, useRef, useState } from "react"
import Button from "../UI/Button"
import Header from "../UI/components/Header"
import MainContent from "../UI/components/MainContent"
import Sidebar from "../UI/components/Sidebar"
import Modal from "../UI/components/Modal"
import Alert from "../UI/components/Alert"
import axios from "axios"
import { BACKEND_URL } from "../config"
import ModeratorCard from "../UI/components/Cards/ModCards/ModeratorsCard"
import AddModeratorCard from "../UI/components/Cards/ModCards/AddModeratorCard"
import { useNavigate } from "react-router-dom"
import logout from "../functions/logout"

const Moderators = ({ person }: { person: "moderator" }) => {
    const navigate = useNavigate()

    const [openAddModModal, setOpenAddModModal] = useState<boolean>(false)
    const [openErrModal, setOpenErrModal] = useState<string>()
    const [mods, setMods] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const fnameRef = useRef<HTMLInputElement>(null)
    const lnameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    async function getMods() {
        try {
            const res = await axios.get(BACKEND_URL + "/api/v1/super-admin/moderators", {
                headers: {
                    authorization: localStorage.getItem("token"),
                    type: person
                }
            })
            setMods(e => e = res.data.mods)
        } catch (err: any) {
            const errMsg = err.response.data.message
            setOpenErrModal(e => e = errMsg)
        }
    }

    async function onAddMod() {
        try {
            setLoading(e => e = true)
            const firstname = fnameRef.current?.value.trim()
            const lastname = lnameRef.current?.value.trim()
            const email = emailRef.current?.value.trim()
            const data = { firstname, lastname, email }
            await axios.post(BACKEND_URL + "/api/v1/super-admin/moderators", data, {
                headers: {
                    authorization: localStorage.getItem("token"),
                    type: person
                }
            })
            setOpenAddModModal(e => e = false)
        } catch (err: any) {
            const errMsg = err.response.data.message
            setOpenErrModal(e => e = errMsg)
        } finally {
            setLoading(e => e = false)
        }
    }

    async function onRemove(e: any) {
        const id = e.target.closest(".container").id
        try {
            setLoading(e => e = true)
            await axios.delete(BACKEND_URL + `/api/v1/super-admin/moderators/${id}`, {
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
        getMods()
    }, [openAddModModal, loading])

    return <div className="w-full h-full">

        {openErrModal && <Modal z_index={"z-5"} open={openErrModal} onClose={() => setOpenErrModal(e => e = undefined)}>
            <Alert msg={openErrModal} />
        </Modal>}

        {openAddModModal && <Modal open={openAddModModal} onClose={() => setOpenAddModModal(e => e = false)}>
            <AddModeratorCard
                fnameRef={fnameRef}
                lnameRef={lnameRef}
                emailRef={emailRef}
                onAddMod={onAddMod}
                loading={loading}
            />
        </Modal>}

        <Sidebar person={person} />
        <MainContent>
            <>
                <Header>
                    <div className="flex justify-center gap-2 items-center">
                        <Button onClick={() => setOpenAddModModal(e => e = true)} variant="primary" text="Add Moderator" />
                        <Button onClick={() => logout(navigate, person)} variant="delete" text="Logout" />
                    </div>
                </Header>
                <div className="flex flex-col pl-5">
                    {/* moderators */}
                    {mods.map((mod, key) => {
                        return (
                            <ModeratorCard
                                key={key}
                                id={mod._id}
                                fname={mod.firstname}
                                lname={mod.lastname}
                                email={mod.email}
                                onRemove={onRemove}
                                loading={loading}
                            />
                        )
                    })}
                </div>
            </>
        </MainContent>
    </div>
}
export default Moderators