import { useNavigate } from "react-router-dom"
import logout from "../functions/logout"
import Button from "../UI/Button"
import Header from "../UI/components/Header"
import MainContent from "../UI/components/MainContent"
import Sidebar from "../UI/components/Sidebar"

const About = ({ person }: { person: "user" | "admin" | "moderator" }) => {
    const navigate = useNavigate()
    return <div className="w-full h-full">
        <Sidebar person={person} />
        <MainContent>
            <>
                <Header>
                    <div className="flex justify-center gap-2 items-center">
                        <Button variant="delete" text="Logout" onClick={() => logout(navigate, person)}/>
                    </div>
                </Header>
                <div className="text-xl text-white">
                    <div className="px-8 mb-8">
                        <b>Event Nest</b> is your one-stop platform for discovering,
                        managing, and organizing society events with ease.
                        Whether you're a society member looking to stay
                        updated or an admin managing multiple activities,
                        Event Nest provides a seamless experience for all.
                    </div>
                    <div className="px-8 mb-8">
                        From announcements and event details to secure verification
                        for organizers, we ensure transparency, accessibility, and
                        simplicity. Our goal is to make campus life
                        more connected—one event at a time.
                    </div>
                    <div className="px-8">
                        Welcome to your new home for events. Welcome to <b>Event Nest</b>.
                    </div>
                </div>
            </>
        </MainContent>
    </div>
}
export default About