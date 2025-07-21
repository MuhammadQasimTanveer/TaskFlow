import { GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { updateTaskStatus  } from '../slices/taskSlice';
import React, { useState, useEffect } from 'react';
import { getTimeLabel } from '../Time/taskTime';
import { useDispatch } from 'react-redux'
import DeleteTask from './DeleteTask';
import './Card.css';

const Card = (props) => {
    const dispatch = useDispatch()
   
    const [isvisible, setisvisible] = useState(false)    // For show/hide description
    const [isMenuVisible, setIsMenuVisible] = useState(false); // For the dropdown menu
    const [showModal, setShowModal] = useState(null);     // For delete task

    const handleClose = () =>  setShowModal(null);

    const handleGripClick =() => { setIsMenuVisible(!isMenuVisible) }

    const handleDoing = () => { setIsMenuVisible(false); dispatch(updateTaskStatus ({ id: props.id, status: 'doing' })); }

    const handleDone = () => { setIsMenuVisible(false); dispatch(updateTaskStatus ({ id: props.id, status: 'done'})); }

    const handleToDo = () => { setIsMenuVisible(false); dispatch(updateTaskStatus ({ id: props.id, status: 'todo' })); }

    const handleDelete = () => {  setIsMenuVisible(false); setShowModal("delete"); }

    useEffect(() => {
      if (isMenuVisible) {
        document.body.classList.add('dropdown-active');
      } 
      else {
        document.body.classList.remove('dropdown-active');
      }

      const handleClickOutside = (event) => {
        if(isMenuVisible && !event.target.closest('.dropdown-menu') && !event.target.closest('.grip-icon')) 
        {
          setIsMenuVisible(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>{
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.classList.remove('dropdown-active'); 
      };
    }, [isMenuVisible]);

  return (
    
    // The style below  shows the behaviour of nested ternary/if else operator based on status
    <div  className="cards" style={{ borderLeft: `4px solid ${ 
      props.status === 'todo' ? '#10b981' : ( 
      props.status === 'doing' ? '#f59e0b' : (
      props.status === 'done' ? '#3b82f6' : '#e5e7eb' ) ) }`  }}>

      <div className={showModal ? 'backdrop-blur' : ''}>
        <div className="card-header"> 
          <h3> {props.title} </h3>
          <GripVertical className="grip-icon" onClick={handleGripClick} size={22} style={{ cursor: 'pointer' }} />
        </div>

        {isMenuVisible && (
          <div className="dropdown-menu">
            {props.status === 'todo' && (
              <>
                <button  onClick={handleDoing}>Move to Doing</button>  
                <button onClick={handleDone}>Move to Done</button> 
                <button onClick={handleDelete} className="drop-delete" >Delete Task</button> 
               </>
            )}
            {props.status === 'doing' && (
              <>
                <button onClick={handleToDo}>Move to To-Do</button>  
                <button onClick={handleDone}>Move to Done</button> 
                <button  onClick={handleDelete} className="drop-delete" >Delete Task</button>
              </>
            )}
            {props.status === 'done' && (
              <>
                <button onClick={handleToDo}>Move to Todo</button>  
                <button onClick={handleDoing}>Move to Doing</button> 
                <button  onClick={handleDelete} className="drop-delete" >Delete Task</button>
              </>
            )}
          </div>
        )}
        
        <span className="timeInfo"><small>{getTimeLabel(props)}</small></span>

        {isvisible && <p className="desc-text">{props.description}</p>}
        {props.description &&  (
          <div className="DescDiv">
            <button onClick={() => {  setisvisible(!isvisible) }} className="desc-toggle-btn">
            {isvisible ? 
            (
              <>  <ChevronUp size={17} /> <p>Hide Description</p>  </>
            ) : 
            (
              <>  <ChevronDown size={17} /> <p>Show Description</p>  </>
            )} </button>
          </div>)
        }
      </div>

      {showModal && <div className="modal-overlay" ></div>}
        {showModal ==="delete" &&   
          <div className="modal-container"> 
            <DeleteTask id={props.id} onClose={handleClose} />
          </div> 
      }
    </div>
  )
}
export default Card