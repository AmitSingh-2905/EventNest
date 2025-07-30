import { useEffect, useState } from "react"
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
import logout from "../functions/logout"
import { useNavigate } from "react-router-dom"

const Events = ({ person }: { person: "user" | "admin" }) => {
    const navigate = useNavigate()

    const [events, setEvents] = useState<any[]>([])
    const [openModal, setOpenModal] = useState<string>()

    async function getEvents() {
        try {
            const res = await axios.get(BACKEND_URL + "/api/v1/events", {
                headers: {
                    type: person,
                    authorization: localStorage.getItem("token")
                }
            })
            setEvents(e => e = res.data.events)
        } catch (err: any) {
            const errMsg = err.response.data.message
            setOpenModal(e => e = errMsg)
        }
    }

    useEffect(() => {
        getEvents()
    }, [])

    return <div className="w-full h-full">
        {openModal && <Modal open={openModal} onClose={() => setOpenModal(e => e = undefined)}>
            <Alert msg={openModal} />
        </Modal>}
        <Sidebar person={person} />
        <MainContent>
            <>
                <Header>
                    <div className="flex justify-center gap-2 items-center">
                        <Button onClick={() => logout(navigate, person)} variant="delete" text="Logout" />
                    </div>
                </Header>
                <div className="flex gap-4 pl-5 flex-wrap ">
                    {/* college events */}
                    {events.map((event, key) => {
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
                                action={false}
                            />
                        );
                    })}
                </div>
            </>
        </MainContent>
    </div>
}
export default Events