import React, { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "../api/blogService";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";


const HomePage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await getAllBlogs();
            setBlogs(response.data);
        } catch (error) {
            toast.error("Error fetching blogs");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            await deleteBlog(id);
            toast.success("Blog deleted successfully!");
            fetchBlogs(); // Refresh list after deleting
        }
    };


    return (
        <div className="container">
            <header className="text-center my-4">
                <h1>📝 My Blog Platform</h1>
                <p>Explore the latest articles written by our amazing authors.</p>
                <Link to="/add" className="btn btn-primary">
                    <FaPlus/> Add New Blog
                </Link>
            </header>

            <div className="row">
                {blogs.length === 0 ? (
                    <p className="text-center">No blogs available. Start by adding one!</p>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog.id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text">{blog.content.substring(0, 100)}...</p>
                                    <p className="text-muted">✍️ {blog.author}</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/blog/${blog.id}`} className="btn btn-outline-primary">
                                            Read More <FaArrowRight />
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(blog.id)}>
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;
