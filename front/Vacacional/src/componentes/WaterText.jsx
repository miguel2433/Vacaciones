import React from "react"

export const WaveText = ({text}) =>{

  return (
    <div className="content"> 
      <h1 className="animation-wave">{text} </h1>
      <h1 className="animation-wave">{text}</h1>
    </div>
  )
}


