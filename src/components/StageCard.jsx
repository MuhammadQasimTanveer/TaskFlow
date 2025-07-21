import React from 'react'

const StageCard = ({ icon, title, description }) => {

  const Icon = icon;
  return (
    <div className="stage-card">
      <Icon 
        color="blue" size={35} 
        style={{ padding: '8px', marginBottom: '16px', borderRadius: '50%', backgroundColor: 'rgb(220,230, 242)'
      }}/>
      <h2> {title} </h2>
      <p> {description} </p>
    </div>
  )
}
export default StageCard