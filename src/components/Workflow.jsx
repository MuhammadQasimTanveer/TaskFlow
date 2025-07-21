import React, { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { useSelector} from 'react-redux'
import InputTask from './InputTask'
import Card from './Card';
import './Workflow.css';

const Workflow = () => {

  const tasks = useSelector((state) => state.task.tasks)
  const TODOtasks = tasks.filter((t)=>{return t.status ==='todo'})
  const Doingtasks = tasks.filter((t)=>{return t.status ==='doing'})
  const Donetasks = tasks.filter((t)=>{return t.status ==='done'})

  const [showModal, setShowModal] = useState(null);

  const handleOpenInput = () => setShowModal("input");
  const handleClose = () => setShowModal(null);

  return (
    <div className="workflow-page">
      <div className={showModal ? 'backdrop-blur' : ''}>

      <section className="boardSec">
       <span className="boardheading"> TaskFlow </span>
        <button className="boardbtn" onClick={handleOpenInput}>
            <CirclePlus color="white" size={16}  />    Add New Task 
        </button>
      </section>

      <section className="board" >
        <div>
          <div className="task-header">
            <h3>To-Do</h3>
            <p className="task-count">{TODOtasks.length}</p>
          </div>
         {TODOtasks.map((task) => ( <Card key={task.id} {...task}/> ))}
        </div>

        <div>
          <div className="task-header">
            <h3>Doing</h3>
            <p className="task-count">{Doingtasks.length}</p>
          </div>
         {Doingtasks.map((task) => ( <Card key={task.id}  {...task} /> ))}
        </div>

        <div>
          <div className="task-header">
            <h3>Done</h3>
            <p className="task-count">{Donetasks.length}</p>
          </div>
         {Donetasks.map((task) => ( <Card key={task.id}  {...task} /> ))}
        </div>
      </section>

      </div>

      {showModal && <div className="modal-overlay" ></div>}
      {showModal ==="input" && 
      <div className="modal-container">  <InputTask onClose={handleClose} /> </div> }
      
    </div>
  )
}
export default Workflow