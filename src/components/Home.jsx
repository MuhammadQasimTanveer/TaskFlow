import React from 'react'
import { ArrowRight, ListTodo, Zap, CircleCheckBig } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import StageCard from './StageCard';
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();   

  return (
    <div>
      <Navbar/>
      <div className="hero-section">
        <h1> Streamline Your Workflow </h1>
        <p> TaskFlow helps you visualize your progress with a simple and effective three-stage system. 
            Focus on what matters, one task at a time.</p>
        <button onClick={() => navigate("/board")}  >  Get Started for Free
          <ArrowRight size={16} />  </button>
      </div>

      <div className="how-it-works">
        <h1> How It Works </h1>
        <p> The simple 3-stage flow to productivity. </p>

        <div className="stage-container">
          <StageCard icon={ListTodo}  title="1. To-Do" 
            description="Capture all your tasks. Big or small, write them down so you don't forget."/>

          <StageCard icon={Zap}  title="2. Doing" 
            description="Focus on the work at hand. Move tasks here to signal you're actively working on them."/>
          
          <StageCard icon={CircleCheckBig} title="3. Done" 
            description="Enjoy the satisfaction. See what you've accomplished and keep the momentum going."/>
        </div>
      </div>
      
      <div className="footer">
        <p> &copy; 2025 TaskFlow. All rights reserved. </p>
      </div>
    </div>
  )
}
export default Home