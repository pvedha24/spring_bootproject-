import React from "react";
import {useState} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthModal from "./components/AuthModal";
import HomePage from "./components/HomePage";
import BlogList from "./components/BlogList";
import AddBlog from "./components/AddBlog";
import BlogDetail from "./components/BlogDetail";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";


function App() {
    const [showModal, setShowModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );

    const requireAuth = (Component) => {
        return isAuthenticated ? <Component /> : (setShowModal(true), null);
    };

    return (
        <Router>
            <div className="container mt-4">

                <ToastContainer position="top-right" autoClose={3000} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/" element={<BlogList />} />
                    <Route path="/add" element={<AddBlog />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

