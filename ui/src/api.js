import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

export const fetchTasks = () => axios.get(API_URL);
export const createTask = (data) => axios.post(API_URL, data);
export const updateTask = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);