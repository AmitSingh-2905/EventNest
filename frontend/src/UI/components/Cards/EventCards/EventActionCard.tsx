import Button from "../../../Button"
import Input from "../../../Input"
import "../../../../styles/radio.css"
import Textarea from "../../../Textarea"

type EventActionCardProps = {
    action: "add" | "edit",
    nameRef?: React.RefObject<HTMLInputElement | null>,
    descRef?: React.RefObject<HTMLTextAreaElement | null>,
    statusRef?: React.RefObject<HTMLInputElement | null>,
    dateRef?: React.RefObject<HTMLInputElement | null>,
    linkRef?: React.RefObject<HTMLInputElement | null>,
    onClick?: () => void
    loading?: boolean
}

const defaultStyles = "flex flex-col gap-10 p-[12px] bg-blue-800 w-[400px]"
const inputSectionStyles = "flex flex-col gap-4"
const placeholder = {
    add: ["Event name", "Event description", "Paste event website URL here"],
    edit: ["New name", "New description", "New URL"],
}
// checked={status === "Upcoming"} 
const EventActionCard = ({ action, nameRef, descRef, statusRef, dateRef, linkRef, onClick, loading }: EventActionCardProps) => {
    return <div className={`${defaultStyles}`}>
        <div className={`${inputSectionStyles}`} >
            <Input reference={nameRef} type="text" placeholder={`${placeholder[action][0]}`} />
            <Textarea reference={descRef} placeholder={`${placeholder[action][1]}`} />
            <div className="text-gray-400 flex gap-6">
                <div className="">
                    <Input reference={dateRef} type="date"  />
                </div>
                <div className="flex gap-5">
                    <div>
                        <input ref={statusRef} type="radio" name="status" value="Ongoing"  />
                        <label htmlFor=""> Ongoing</label>
                    </div>
                    <div>  
                        <input type="radio" name="status" value="Upcoming" />
                        <label htmlFor=""> Upcoming </label>
                    </div>
                </div>
            </div>
            <Input reference={linkRef} type="url" placeholder={`${placeholder[action][2]}`} />
        </div>
        <Button onClick={onClick} loading={loading} variant="primary" text="Done" />
    </div>
}

export default EventActionCard