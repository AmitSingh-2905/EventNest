import { useNavigate } from "react-router-dom"
import Button from "../UI/Button"

const Landing = () => {
    const navigate = useNavigate()
    return <div className="h-full w-full flex justify-center items-center">
        <div className="flex flex-col gap-6">
            {/* Hero Section */}
            <div className="text-center text-white mb-10">
                <h1 className="text-5xl font-bold mb-2 text-neonblue-500">Welcome to Event Nest</h1>
                <p className="text-xl text-gray-300">
                    One place for all your campus events — connect, manage, and organize effortlessly.
                </p>
            </div>
            {/* Role selection section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {/* User */}
                <div className="bg-blue-800 p-6 rounded-2xl shadow-lg text-white text-center">
                    <h2 className="text-2xl font-semibold mb-4">User</h2>
                    <p className="mb-6 text-gray-300">Explore and register for events happening around you.</p>
                    <div className="flex justify-center gap-4">
                        <Button text="Login" variant="primary" onClick={() => navigate("/user/login")} />
                        <Button text="Register" variant="secondary" onClick={() => navigate("/user/register")} />
                    </div>
                </div>

                {/* Admin */}
                <div className="bg-blue-800 p-6 rounded-2xl shadow-lg text-white text-center">
                    <h2 className="text-2xl font-semibold mb-4">Admin</h2>
                    <p className="mb-6 text-gray-300">Manage your college's societies and events efficiently.</p>
                    <div className="flex justify-center gap-4">
                        <Button text="Login" variant="primary" onClick={() => navigate("/admin/login")} />
                        <Button text="Register" variant="secondary" onClick={() => navigate("/admin/register")} />
                    </div>
                </div>

                {/* Moderator */}
                <div className="bg-blue-800 p-6 rounded-2xl shadow-lg text-white text-center">
                    <h2 className="text-2xl font-semibold mb-4">Moderator</h2>
                    <p className="mb-6 text-gray-300">Verify and approve event submissions from societies.</p>
                    <div className="flex justify-center">
                        <Button text="Login" variant="primary" onClick={() => navigate("/moderator/login")} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Landing