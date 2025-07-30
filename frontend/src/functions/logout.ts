import type { NavigateFunction } from "react-router-dom";

function logout(navigate: NavigateFunction, person: "user" | "admin" | "moderator") {
    localStorage.removeItem("token");
    navigate(`/`)
}

export default logout