import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "../api/blogService";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        try {
            const response = await getBlogById(id);
            setBlog(response.data);
        } catch (error) {
            toast.error("Error fetching blog details");
        }
    };

    return (
        <div className="container mt-4">
            <Link to="/" className="btn btn-secondary mb-3">
                <FaArrowLeft /> Back to Blogs
            </Link>

            {blog ? (
                <div className="card p-4 shadow">
                    <h2 className="mb-3">{blog.title}</h2>
                    <p>{blog.content}</p>
                    <p className="text-muted"><b>✍️ Author:</b> {blog.author}</p>
                </div>
            ) : (
                <p className="text-center">Loading blog...</p>
            )}
        </div>
    );
};

export default BlogDetail;
