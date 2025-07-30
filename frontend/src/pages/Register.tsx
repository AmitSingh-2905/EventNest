import { useRef, useState } from "react"
import Input from "../UI/Input"
import Label from "../UI/Label"
import Button from "../UI/Button"
import Modal from "../UI/components/Modal"
import Alert from "../UI/components/Alert"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

type RegisterProps = {
    person: "user" | "admin"
}

const defaultStyles = "flex flex-col gap-10 p-[12px] bg-blue-800 w-[400px]"
const inputSectionStyles = "flex flex-col gap-4"

const Register = ({ person }: RegisterProps) => {
    const [openModal, setOpenModal] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const fnameRef = useRef<HTMLInputElement>(null)
    const lnameRef = useRef<HTMLInputElement>(null)
    const collegeRef = useRef<HTMLInputElement>(null)
    const societyRef = useRef<HTMLInputElement>(null)
    const proofRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    async function onRegister() {
        try {
            setLoading(e => e = true)
            if (person === "user") {
                await axios.post(BACKEND_URL + `/api/v1/user/signup`, {
                    firstname: fnameRef.current?.value.trim(),
                    lastname: lnameRef.current?.value.trim(),
                    college: collegeRef.current?.value.trim(),
                    email: emailRef.current?.value.trim(),
                    password: passwordRef.current?.value,
                })
                navigate("/user/login")
            } else if (person === "admin") {
                const res = await axios.post(BACKEND_URL + `/api/v1/admin/signup`, {
                    firstname: fnameRef.current?.value.trim(),
                    lastname: lnameRef.current?.value.trim(),
                    college: collegeRef.current?.value.trim(),
                    society: societyRef.current?.value.trim(),
                    identity_proof: proofRef.current?.value.trim(),
                    email: emailRef.current?.value.trim(),
                    password: passwordRef.current?.value,
                })
                setOpenModal(e => e = res.data?.message)
            }
        } catch (err: any) {
            const errMsg = err.response.data.message
            setOpenModal(e => e = errMsg)
        } finally {
            setLoading(e => e = false)
        }
    }

    return <div className="w-full h-full flex justify-center items-center">
        {openModal && <Modal open={openModal} onClose={() => setOpenModal(e => e = undefined)}>
            <Alert msg={openModal} />
        </Modal>}
        <div className={`${defaultStyles}`}>
            <div className={`${inputSectionStyles}`}>
                <Input reference={fnameRef} type="text" placeholder="Enter your firstname" />
                <Input reference={lnameRef} type="text" placeholder="Enter your lastname" />
                <Input reference={collegeRef} type="text" placeholder="Enter your college" />
                {person === "admin" &&
                    <div className={`${inputSectionStyles}`}>
                        <Input reference={societyRef} type="text" placeholder="Enter your society" />
                        <div className="flex flex-col gap-0.5 mt-[-5px]">
                            <Label text="Please provide Google Drive link containing proof of your society admin role below" />
                            <Input reference={proofRef} type="url" placeholder="Paste google drive URL here" />
                        </div>
                    </div>}
                <Input reference={emailRef} type="text" placeholder="Enter your email" />
                <Input reference={passwordRef} type="password" placeholder="Enter your password" />
            </div>
            <Button onClick={onRegister} variant="secondary" text={person === "user" ? "Register" : "Apply"} loading={loading} />
        </div>
    </div>
}
export default Register