import { createSlice } from '@reduxjs/toolkit';

//Local Storage functions
const saveTasks = (tasks) => {
  console.log("Local storage updated")
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
  const data = localStorage.getItem('tasks');
  return data ? JSON.parse(data) : [];
};

//taskSlice Content
const initialState = {
  tasks: loadTasks(),
};

const taskSlice = createSlice({
  name: 'task', 
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
     deleteTask: (state, action) => {
      const {id} = action.payload;   
      state.tasks = state.tasks.filter((task)=>{return task.id !== id})
       saveTasks(state.tasks);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((t) => { return t.id === id });
      if (task) {

        const currentTime = Date.now();
        // Update timestamps based on new status
        if (status === 'doing') 
        {
          task.startedAt = currentTime;
          task.completedAt = null; // Reset completed time if moving back to doing
        } 
        else if (status === 'done') 
        {
          task.completedAt = currentTime;
        }
        // If returning to todo, keep createdAt, but reset others
        else if (status === 'todo') 
        {
          task.startedAt = null;
          task.completedAt = null;
        }
        task.status = status;
        saveTasks(state.tasks);
      }
    }
  },
});
export const { addTask, deleteTask, updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;