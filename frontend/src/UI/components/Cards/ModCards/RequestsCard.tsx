import Button from "../../../Button"
import Info from "../../../Info"
import ShinyCover from "../../../ShinyCover"

type RequestCardProps = {
    id: string
    fname: string
    lname: string
    email: string
    college: string
    society: string
    proof_link: string
    onApprove?: (e: any) => void
    onReject?: (e: any) => void
    loading?: boolean
}

const defaultStyles = "bg-blue-900 flex flex-col gap-10 text-lg tracking-wide rounded-md p-4"

const RequestsCard = ({ id, fname, lname, email, college, society, proof_link, onApprove, onReject, loading }: RequestCardProps) => {
    return <ShinyCover maxWidth="max-w-full" childBorderRadius="rounded-md" coverType="secondary" >
        <div id={id} className={`container ${defaultStyles}`}>
            <div>
                <Info title="Firstname" content={fname} contentType="text" />
                <Info title="Lastname" content={lname} contentType="text" />
                <Info title="Email" content={email} contentType="text" />
                <Info title="College" content={college} contentType="text" />
                <Info title="Society" content={society} contentType="text" />
                <Info title="Proof" content={proof_link} contentType="url" />
            </div>
            <div className="flex justify-between">
                <Button onClick={onApprove} loading={loading} variant="secondary" text="Approve" />
                <Button onClick={onReject} loading={loading} variant="delete" text="Reject" />
            </div>
        </div>
    </ShinyCover>
}

export default RequestsCard