import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from '../slices/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import './InputTask.css';


const InputTask = (props) => {

  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.task.tasks)

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(''); // for showing custom error

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = taskName.trim();
    const isDuplicate = tasks.some((task) => {
      return task.title.toLowerCase() === title.toLowerCase();
    });

    if (isDuplicate == true) {
      console.log("Duplicate task found");
      setError('A task with this title already exists.');
      return;
    }

    setIsSubmitting(true);
    const newTask = {
      id: uuidv4(),           // Provided Unique Id everytime
      title: taskName,
      description: description,
      status: 'todo',
      createdAt: Date.now(),  // Current time
      startedAt: null,        // Will be set when moved to "doing"
      completedAt: null       // Will be set when moved to "done"
    };

    dispatch(addTask(newTask));
    props.onClose();
  }

  const handlechange = (e) => {
    setError('');
    setTaskName(e.target.value)
  }

  return (
    <>
      <div className="inputContainer">
        <div className="inputHeader">
          <h2> Add a New Task</h2>
          <p> What do you need to get done? Fill in the details below.</p>
        </div>

        <form onSubmit={handleSubmit} className="formContainer">

          <label htmlFor='taskName'> Task Name </label>
          <input id="taskName" name="taskName" type='text' placeholder='e.g., Design new landing page'
            title="This task has been repeated" required value={taskName}
            onChange={handlechange} />

          {error && (
            <p style={{ color: 'red', fontSize: '13px', margin: '-9px 0px 9px 4px' }}>{error}</p>
          )}

          <label htmlFor='description'> Description (Optional)</label>
          <textarea id="description" name="description" type='text' placeholder='Add any extra details or notes here'
            value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

          <div className="formbutton">
            <button type="button" onClick={props.onClose}> Cancel </button>
            <button type="submit" disabled={isSubmitting}> Create Task </button>
          </div>
        </form>
      </div>
    </>
  )
}
export default InputTask