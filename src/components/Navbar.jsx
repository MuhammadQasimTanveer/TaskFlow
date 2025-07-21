import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <>
    <nav style={{display: 'flex', justifyContent:'space-between', alignItems: 'center', padding: '16px 24px'}}>
      <span style={{ fontSize: '23px',fontWeight: 'bold', fontFamily:'Times New Roman' , marginLeft: '30px'}}> TaskFlow </span>
      <button onClick={() => navigate("/board")} 
       style={{ 
          background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px',borderRadius: '6px',
          cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px'
        }}
        onMouseEnter={(e) => e.target.style.background = '#2563eb'}
        onMouseLeave={(e) => e.target.style.background = '#3b82f6'} 
        > 
        Go to Board  <ArrowRight size={16} /> 
      </button>
    </nav>
    </>
  )
}
export default Navbar