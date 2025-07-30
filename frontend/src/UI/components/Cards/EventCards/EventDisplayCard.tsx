import "../../../../styles/scrollbar.css"
import Button from "../../../Button"
import EditIcon from "../../../../icons/EditIcon"
import DeleteIcon from "../../../../icons/DeleteIcon"
import ShinyCover from "../../../ShinyCover"

type EventDisplayCardProps = {
    name: string,
    description: string,
    status: "Ongoing" | "Upcoming",
    date: string,
    society: string,
    event_URL: string,
    id: string,
    action: boolean,
    onEdit?: (e: any) => void,
    onDelete?: (e: any) => void, 
    loading?: boolean
}

const defaultStyles = "text-white tracking-wide flex flex-col gap-5 p-[18px] bg-blue-900 rounded-md h-82 w-72"
const eventTime = {
    "Ongoing": "ends in ",
    "Upcoming": "starts from ",
}

const EventDisplayCard = ({ name, description, status, date, society, event_URL, id, action, onEdit, onDelete, loading }: EventDisplayCardProps) => {
    return <ShinyCover childBorderRadius="rounded-md" coverType="primary">
        {/* container  */}
        <div id={id} className={`${defaultStyles} container`}>
            {/* name */}
            <div className="h-18 text-center text-2xl font-semibold overflow-y-auto">
                {name}
            </div>
            {/* description */}
            <div className={`h-28 text-xs text-center overflow-y-auto`} >
                {description}
            </div>
            {/* separate div for status & date  */}
            <div>
                {/* date */}
                <div className="">
                    <span className={`text-sm uppercase font-bold ${status === "Ongoing" ? "text-green-300" : "text-yellow-300"} `}>
                        {status}:
                    </span>
                    <span className="text-xs ml-2">
                        {eventTime[status]} {date}
                    </span>
                </div>
                {/* society */}
                <div className="">
                    <span className="text-sm uppercase font-bold ">
                        SOCIETY:    
                    </span>
                    <span className="text-xs ml-2">
                        {society}
                    </span>
                </div>
            </div>
            {/* event url */}
            <div className="text-center text-xs">
                Interested? <a className="hover:underline" href={event_URL} target="_blank">Click here</a>
            </div>
            {/* action section */}
            {action &&
                <div className="flex justify-between">
                    <Button onClick={onEdit} loading={loading} variant="edit" text="Edit" startIcon={<EditIcon />} />
                    <Button onClick={onDelete} loading={loading} variant="delete" text="Delete" startIcon={<DeleteIcon />} />
                </div>}
        </div>
    </ShinyCover>
}

export default EventDisplayCard