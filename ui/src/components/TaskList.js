import React from 'react';
import List from '@mui/material/List';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onChange }) {
  return (
    <List>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onChange={onChange} />
      ))}
    </List>
  );
}