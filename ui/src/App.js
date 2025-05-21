import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit'; // ✅ This line
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { fetchTasks } from './api';


function App() {
const [tasks, setTasks] = useState([]);

const load = () => {
    fetchTasks().then(res => setTasks(res.data));
};

useEffect(() => { load(); }, []);

return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
    <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
        To‑Do List
        </Typography>
        <Box my={2}>
        <AddTask onAdd={load} />
        </Box>
        <TaskList tasks={tasks} onChange={load} />
    </Paper>
    </Container>
);
}

export default App;