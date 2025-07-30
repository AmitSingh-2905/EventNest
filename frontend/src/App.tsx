import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import About from "./pages/About"
import Events from "./pages/Events"
import Workspace from "./pages/Workspace"
import Requests from "./pages/Requests"
import Moderators from "./pages/Moderators"
import Landing from "./pages/Landing"
import NotFound from "./pages/NotFound"

const App = () => {
  return <div className="w-screen h-screen">

        <BrowserRouter>  
          <Routes>
            {/* landing page route */}
            <Route path="/" element={<Landing />} />
            {/* login routes*/}
            <Route path="/user/login" element={<Login person="user" />} />
            <Route path="/admin/login" element={<Login person="admin"/>} />
            <Route path="/moderator/login" element={<Login person="moderator"/>} />
            {/* register routes*/}
            <Route path="/user/register" element={<Register person="user"/>} />
            <Route path="/admin/register" element={<Register person="admin"/>} />
            {/* user routes */}
            <Route path="/user/college/events" element={<Events person="user"/>} />
            <Route path="/user/website/about" element={<About person="user"/>} />
            {/* admin routes */}
            <Route path="/admin/college/events" element={<Events person="admin" />} />
            <Route path="/admin/website/about" element={<About person="admin"/>} />
            <Route path="/admin/workspace" element={<Workspace person="admin" />} />
            {/* moderator routes  */}
            <Route path="/moderator/requests" element={<Requests person="moderator"/>} />
            <Route path="/moderator/moderators" element={<Moderators person="moderator"/>} />
            {/* page not found route*/}
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

  </div>
}
export default App