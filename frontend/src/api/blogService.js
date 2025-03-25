
import axios from "axios";

const API_URL = "http://localhost:9090/api/blogs";  // Spring Boot backend URL

// Fetch all blogs
export const getAllBlogs = async () => {
    return axios.get(API_URL);
};

// Get a single blog by ID
export const getBlogById = async (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// Add a new blog
export const createBlog = async (blogData) => {
    return axios.post(API_URL, blogData);
};

// Delete a blog
export const deleteBlog = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
