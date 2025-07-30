import { useRef, useState } from "react"
import Input from "../UI/Input"
import Button from "../UI/Button"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import Modal from "../UI/components/Modal"
import Alert from "../UI/components/Alert"

type LoginProps = {
    person: "user" | "admin" | "moderator"
}

const defaultStyles = "flex flex-col gap-10 p-[12px] bg-blue-800 w-[400px]"

const Login = ({ person }: LoginProps) => {
    const [openModal, setOpenModal] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    async function onLogin() {
        try {
            setLoading(e => e = true)
            const res = await axios.post(BACKEND_URL + `/api/v1/${person}/signin`, {
                email: emailRef.current?.value.trim(),
                password: passwordRef.current?.value
            })
            const jwt = res.data.token
            localStorage.setItem("token", jwt);
            if (person === "admin" || person === "user") {
                navigate(`/${person}/college/events`)
            } else {
                navigate("/moderator/requests")
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
            <div className="flex flex-col gap-4">
                <Input reference={emailRef} type="text" placeholder="Enter your email" />
                <Input reference={passwordRef} type="password" placeholder={`Enter your ${person === "moderator" ? "secret key" : "password"}`} />
            </div>
            <Button onClick={onLogin} variant="primary" text="Login" loading={loading} />
        </div>
    </div>
}
export default Login