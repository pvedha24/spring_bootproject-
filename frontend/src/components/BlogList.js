// import React, { useEffect, useState } from "react";
// import { getAllBlogs, deleteBlog } from "../api/blogService";
// import { Link } from "react-router-dom";
//
// const BlogList = () => {
//     const [blogs, setBlogs] = useState([]);
//
//     useEffect(() => {
//         fetchBlogs();
//     }, []);
//
//     const fetchBlogs = async () => {
//         try {
//             const response = await getAllBlogs();
//             setBlogs(response.data);
//         } catch (error) {
//             console.error("Error fetching blogs:", error);
//         }
//     };
//
//     const handleDelete = async (id) => {
//         await deleteBlog(id);
//         fetchBlogs();
//     };
//
//     return (
//         <div className="container">
//             <h2>All Blogs</h2>
//             <Link to="/add" className="btn btn-primary">Add New Blog</Link>
//             <ul className="list-group mt-3">
//                 {blogs.map((blog) => (
//                     <li key={blog.id} className="list-group-item d-flex justify-content-between">
//                         <div>
//                             <h3>{blog.title}</h3>
//                             <p>{blog.content}</p>
//                             <p><b>Author:</b> {blog.author}</p>
//                         </div>
//                         <div>
//                             <Link to={`/blog/${blog.id}`} className="btn btn-info btn-sm me-2">View</Link>
//                             <button className="btn btn-danger btn-sm" onClick={() => handleDelete(blog.id)}>Delete</button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default BlogList;


import React, { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "../api/blogService";
import { Link } from "react-router-dom";
import { FaTrash, FaEye, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogList = () => {
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
            fetchBlogs();
            toast.success("Blog deleted successfully!");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-3">📖 Blog List</h2>
            <Link to="/add" className="btn btn-success mb-3">
                <FaPlus /> Add New Blog
            </Link>
            <div className="list-group">
                {blogs.length === 0 ? (
                    <p className="text-center">No blogs available. Add some!</p>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h4>{blog.title}</h4>
                                <p>{blog.content.substring(0, 100)}...</p>
                                <p className="text-muted">✍️ {blog.author}</p>
                            </div>
                            <div>
                                <Link to={`/blog/${blog.id}`} className="btn btn-info btn-sm me-2">
                                    <FaEye /> View
                                </Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(blog.id)}>
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BlogList;
