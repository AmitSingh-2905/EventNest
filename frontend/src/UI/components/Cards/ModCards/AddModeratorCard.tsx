import Button from "../../../Button"
import Input from "../../../Input"

type AddModeratorCardProps = {
    fnameRef: React.RefObject<HTMLInputElement | null>
    lnameRef: React.RefObject<HTMLInputElement | null>
    emailRef: React.RefObject<HTMLInputElement | null>
    onAddMod?: (e: any) => void 
    loading: boolean
}

const defaultStyles = "flex flex-col gap-10 p-[12px] bg-blue-800 w-[400px]"
const inputSectionStyles = "flex flex-col gap-4"

const AddModeratorCard = ({ fnameRef, lnameRef, emailRef, onAddMod, loading }: AddModeratorCardProps) => {
    return <div className={`${defaultStyles}`}>
        <div className={`${inputSectionStyles}`}>
            <Input reference={fnameRef} type="text" placeholder="Enter moderator firstname" />
            <Input reference={lnameRef} type="text" placeholder="Enter moderator lastname" />
            <Input reference={emailRef} type="text" placeholder="Enter moderator email" />
        </div>
        <Button onClick={onAddMod} loading={loading} variant="primary" text="Add" />
    </div>
}

export default AddModeratorCard