import { useNavigate } from "react-router-dom"
import Button from "../UI/Button"

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-blue-900 text-white text-center px-4">
            <div className="text-9xl font-bold text-neonblue-500 mb-4">404</div>
            <div className="text-2xl md:text-3xl font-semibold mb-2">Oops! Page not found</div>
            <p className="text-base md:text-lg text-gray-300 mb-6">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Button
                text="Go to Home"
                variant="primary"
                onClick={() => navigate("/")}
            />
        </div>
    )
}

export default NotFound
