import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTask } from '../api';

export default function AddTask({ onAdd }) {
const [content, setContent] = useState('');
const [due, setDue] = useState('');

const submit = () => {
    if (!content) return;
    createTask({ content, due_date: due ? new Date(due).toISOString() : null })
    .then(() => {
        setContent(''); setDue('');
        onAdd();
    });
};

return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
    <TextField
        fullWidth
        label="Task"
        value={content}
        onChange={e => setContent(e.target.value)}
    />
    <TextField
        type="date"
        InputLabelProps={{ shrink: true }}
        label="Due"
        value={due}
        onChange={e => setDue(e.target.value)}
    />
    <Button variant="contained" onClick={submit}>
        Add
    </Button>
    </Stack>
);
}