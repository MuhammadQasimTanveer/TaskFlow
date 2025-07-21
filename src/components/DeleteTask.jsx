import {useDispatch } from 'react-redux'
import {deleteTask } from '../slices/taskSlice';
import React from 'react'
import './DeleteTask.css';

  const DeleteTask = (props) => {
    const dispatch = useDispatch()

    const handleClick =() =>{
      console.log("DeleteTask with id →", props.id);
      dispatch(deleteTask({ id: props.id }));
      props.onClose();
    }
    
  return (
    <>
      <div className="deleteContainer" >
        <h2> Are you absolutely sure?</h2>
        <p> This action cannot be undone. This will permanently delete this task. </p>
        <div className="deleteButtons">
          <button onClick={props.onClose}> Cancel </button>
          <button onClick={handleClick}> Yes, delete task </button>
        </div>
      </div>
    </>
  )
}
export default DeleteTask