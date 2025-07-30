import { useEffect, useRef, useState } from "react"
import Button from "../UI/Button"
import EventDisplayCard from "../UI/components/Cards/EventCards/EventDisplayCard"
import Header from "../UI/components/Header"
import MainContent from "../UI/components/MainContent"
import Sidebar from "../UI/components/Sidebar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import Modal from "../UI/components/Modal"
import Alert from "../UI/components/Alert"
import getDateAsString from "../functions/getDateAsString"
import EventActionCard from "../UI/components/Cards/EventCards/EventActionCard"
import getDateAsNumber from "../functions/getDateAsNumber"
import { useNavigate } from "react-router-dom"
import logout from "../functions/logout"

const Workspace = ({ person }: { person: "admin" }) => {
    const navigate = useNavigate()

    const [adminEvents, setAdminEvents] = useState<any[]>([])
    const [openErrModal, setOpenErrModal] = useState<string>()
    const [openAddEventModal, setOpenAddEventModal] = useState<boolean>(false)
    const [openEditEventModal, setOpenEditEventModal] = useState<string | undefined>("")
    // reason behind taking above as string | undefined type_ 
    // undefined to return false & close the modal
    // string in order to store the msg to be displayed in Alert modal
    const [loading, setLoading] = useState<boolean>(false)

    const nameRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)
    const statusRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)

    async function getAdminEvents() {
        try {
            const res = await axios.get(BACKEND_URL + "/api/v1/admin/events", {
                headers: {
                    type: person,
                    authorization: localStorage.getItem("token")
                }
            })
            setAdminEvents(e => e = res.data.adminEvents)
        } catch (err: any) {
            const errMsg = err.response.data.message
            setOpenErrModal(e => e = errMsg)
        }
    }

    function getData() {
        const name = nameRef.current?.value.trim()
        const description = descRef.current?.value.trim()
        let status: "Ongoing" | "Upcoming" = "Upcoming"
        if (statusRef.current?.checked) status = "Ongoing"
        const date = getDateAsNumber(dateRef.current?.value!)
        const event_URL = linkRef.current?.value.trim()
        return { name, description, status, date, event_URL }
    }

    async function onEdit() {
        try {
            setLoading(e => e = true)
            const data = getData()
            await axios.put(BACKEND_URL + `/api/v1/admin/events/${openEditEventModal}`, data, {
                headers: {
                    type: person,
                    authorization: localStorage.getItem("token")
                }
            })
            // location.reload()
            setOpenEditEventModal(e => e = undefined)
        } catch (err: any) {
            const errMsg = err.response.data.message
            setOpenErrModal(e => e = errMsg)
        } finally {
            setLoading(e => e = false)
        }
    }

    async function onDelete(e: any) {
        try {
            setLoading(e => e = true)
            const id = e.target?.closest(".container").id
            await axios.delete(BACKEND_URL + `/api/v1/admin/events/${id}`, {
                headers: {
                    type: person,
                    authorization: localStorage.getItem("token")
                }
            })
            // location.reload()
        } catch (err: any) {
            const errMsg = err.response.data.message
            setOpenErrModal(e => e = errMsg)
        } finally {
            setLoading(e => e = false)
        }
    }

    async function onAdd() {
        try {
            setLoading(e => e = true)
            const data = getData()
            await axios.post(BACKEND_URL + "/api/v1/admin/events", data, {
                headers: {
                    type: person,
                    authorization: localStorage.getItem("token")
                },
            })
            setOpenAddEventModal(e => e = false)
        } catch (err: any) {
            const errMsg = err.response.data.message
            setOpenErrModal(e => e = errMsg)
        } finally {
            setLoading(e => e = false)
        }
    }

    useEffect(() => {
        getAdminEvents()
    }, [openAddEventModal, openEditEventModal, loading])

    return <div className="w-full h-full">

        {openErrModal && <Modal z_index={"z-5"} open={openErrModal} onClose={() => setOpenErrModal(e => e = undefined)}>
            <Alert msg={openErrModal} />
        </Modal>}

        {openAddEventModal && <Modal open={openAddEventModal} onClose={() => setOpenAddEventModal(e => e = false)}>
            <EventActionCard
                action={"add"}
                nameRef={nameRef}
                descRef={descRef}
                statusRef={statusRef}
                dateRef={dateRef}
                linkRef={linkRef}
                onClick={onAdd}
                loading={loading}
            />
        </Modal>}

        {openEditEventModal && <Modal open={openEditEventModal} onClose={() => setOpenEditEventModal(e => e = undefined)}>
            <EventActionCard
                action={"edit"}
                nameRef={nameRef}
                descRef={descRef}
                statusRef={statusRef}
                dateRef={dateRef}
                linkRef={linkRef}
                onClick={onEdit}
                loading={loading}
            />
        </Modal>}
        
        <Sidebar person={person} />
        <MainContent>
            <>
                <Header>
                    <div className="flex justify-center gap-2 items-center">
                        <Button onClick={() => setOpenAddEventModal(e => e = true)} variant="primary" text="Add Event" />
                        <Button onClick={() => logout(navigate, person)} variant="delete" text="Logout" />
                    </div>
                </Header>
                <div className="flex gap-2 pl-5 flex-wrap ">
                    {/* admin events */}
                    {adminEvents.map((event, key) => {
                        return (
                            <EventDisplayCard
                                key={key}
                                name={event.name}
                                description={event.description}
                                society={event.society}
                                status={event.status}
                                date={getDateAsString(event.date)}
                                event_URL={event.event_URL}
                                id={event._id}
                                action={true}
                                onEdit={(e) => {
                                    setOpenEditEventModal(_e => _e = e.target.closest(".container").id)
                                }}
                                onDelete={onDelete}
                                loading={loading}
                            />
                        );
                    })}
                </div>
            </>
        </MainContent>
    </div>
}
export default Workspace