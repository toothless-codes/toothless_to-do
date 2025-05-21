import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import { updateTask, deleteTask } from '../api';

export default function TaskItem({ task, onChange }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.content);

  const toggleDone = () => {
    updateTask(task.id, { done: !task.done }).then(onChange);
  };
  const save = () => {
    updateTask(task.id, { content: text }).then(() => { setEditing(false); onChange(); });
  };
  const remove = () => {
    deleteTask(task.id).then(onChange);
  };

  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" spacing={1} alignItems="center">
          {editing ? (
            <Button onClick={save}>Save</Button>
          ) : (
            <IconButton edge="end" onClick={() => setEditing(true)}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton edge="end" onClick={remove}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      }
    >
      <Checkbox checked={task.done} onChange={toggleDone} />
      {editing ? (
        <TextField value={text} onChange={e => setText(e.target.value)} fullWidth />
      ) : (
        <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
          {task.content}
        </span>
      )}
    </ListItem>
  );
}
