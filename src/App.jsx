import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import Projects from "./pages/Projects"
import FooterB from "./components/FooterB"
import PrivateRoute from "./components/PrivateRoute"
import Dashboard from './pages/Dashboard';
function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/sign-in" element={<SignIn/>}></Route>
        <Route  element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
       
        </Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
        <Route path="/projects" element={<Projects/>}></Route>
      </Routes>
      <FooterB/>
    </Router>
  )
}

export default App
