import SidebarItem from "./SidebarItem"
import { useNavigate } from "react-router-dom"
import EventsIcon from "../../icons/EventsIcon"
import AboutIcon from "../../icons/AboutIcon"
import WorkshopIcon from "../../icons/WorkshopIcon"
import AdminRequestsIcon from "../../icons/AdminRequestsIcon"
import ModsIcon from "../../icons/ModsIcon"

type SidebarProps = {
    person: "user" | "admin" | "moderator"
}
type SidebarHeadingProps = {}

const defaultStyles = "bg-blue-500 h-full fixed z-2 w-72 rounded-r-lg"

const Sidebar = ({ person }: SidebarProps) => {
    const navigate = useNavigate()
    return <div className={`${defaultStyles}`}>
        <SidebarHeading />

        {person === "user" &&
            <div className="flex flex-col gap-1 mt-10">
                <SidebarItem onClick={() => navigate("/user/college/events")} color="text-white" text="Events" icon={<EventsIcon />} />
                <SidebarItem onClick={() => navigate("/user/website/about")} color="text-white" text="About" icon={<AboutIcon />} />
            </div>}

        {person === "admin" &&
            <div className="flex flex-col gap-1 mt-10">
                <SidebarItem onClick={() => navigate("/admin/college/events")} color="text-white" text="Events" icon={<EventsIcon />} />
                <SidebarItem onClick={() => navigate("/admin/website/about")} color="text-white" text="About" icon={<AboutIcon />} />
                <SidebarItem onClick={() => navigate("/admin/workspace")} color="text-white" text="Workspace" icon={<WorkshopIcon />} />
            </div>}

        {person === "moderator" &&
            <div className="flex flex-col gap-1 mt-10">
                <SidebarItem onClick={() => navigate("/moderator/requests")} color="text-white" text="Requests" icon={<AdminRequestsIcon />} />
                <SidebarItem onClick={() => navigate("/moderator/moderators")} color="text-white" text="Moderators" icon={<ModsIcon />} />
            </div>}

    </div>
}

const SidebarHeading = ({ }: SidebarHeadingProps) => {
    return <div className="text-2xl text-white font-extrabold text-center p-2">
        Event Nest
    </div>
}

export default Sidebar 