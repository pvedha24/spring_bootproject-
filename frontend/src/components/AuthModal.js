import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const AuthModal = ({ show, handleClose, setIsAuthenticated }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState({ username: "", email: "", password: "" });

    const toggleAuth = () => setIsLogin(!isLogin);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            // Mock login
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (!storedUser || storedUser.email !== user.email || storedUser.password !== user.password) {
                toast.error("Invalid credentials!");
                return;
            }
            localStorage.setItem("isAuthenticated", "true");
            setIsAuthenticated(true);
            toast.success("Login successful!");
        } else {
            // Mock signup
            if (!user.username || !user.email || !user.password) {
                toast.warn("All fields are required!");
                return;
            }
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Signup successful! Please log in.");
            setIsLogin(true);
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isLogin ? "🔐 Login" : "📝 Sign Up"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" onChange={handleChange} required />
                        </Form.Group>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label >Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={handleChange} required />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100">
                        {isLogin ? "Login" : "Sign Up"}
                    </Button>
                </Form>
                <p className="text-center mt-3">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span className="text-primary" style={{ cursor: "pointer" }} onClick={toggleAuth}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
                </p>
            </Modal.Body>
        </Modal>
    );
};

export default AuthModal;

