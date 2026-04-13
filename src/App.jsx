import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Navbar from "./components/Navbar"
import Main from "./components/Main"
import Footer from "./components/Footer"

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-poppins selection:bg-emerald-500 selection:text-white">
        <Navbar />

        <Main />

        <Footer />
      </div>
    </Router>
  )
}