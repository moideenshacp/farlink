import {BrowserRouter ,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"

function App() {

  return (
    <BrowserRouter>

    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>

    </BrowserRouter>
  )
}

export default App
