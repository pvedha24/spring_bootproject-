

import React, { useState } from "react";
import { createBlog } from "../api/blogService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBlog = () => {
    const [blog, setBlog] = useState({ title: "", content: "", author: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!blog.title || !blog.content || !blog.author) {
            toast.warn("Please fill all fields");
            return;
        }
        await createBlog(blog);
        toast.success("Blog added successfully!");
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-3">✏️ Add New Blog</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" value={blog.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea name="content" className="form-control" rows="4" value={blog.content} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input type="text" name="author" className="form-control" value={blog.author} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;
