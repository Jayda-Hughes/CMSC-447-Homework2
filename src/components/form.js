
import React, { useState, useEffect } from 'react'
import APIService from '../componets/APIService'

function form(props) {

const[Name,setName]= useState(props.project.Name)
const[Points,setPoints]= useState(props.project.Points)


useEffect(()=>{
    setName(props.project.Name)
    setPoints(props.project.Points)
},[props.project])


const updateProject= () =>{
        APIService.updateProject(props.project.id, {Name,Points})
        .then(resp =>props.updatedData(resp))
        .catch(error=> console.log(error))

}

const insertProject= () => {
    APIService.insertProject({Name,Points})
    .then(resp=> props.insertedProject(resp))
    .catch(error => console.log(error))
}

  return (
    <div>
        {props.project ? (

                <div className= "mb-3">
                <label htmlFor = "Name" className = "form-label"> Name</label>
                
                <input type="text" className="form-control"
                value={Name}
                placeholder= "Please enter name"
                onChange={(e)=> setName(e.target.value)}
                />

                <label htmlFor = "Points" className = "form-label"> Points</label>
                
                <input type="text" className="form-control"
                value={Points}
                placeholder= "Please enter the points"
                onChange={(e)=> setPoints(e.target.value)}
                />

                {
                    props.project.id ? <button
                    onClick={updateProject}
                    className ="btn-btn-success mt-3"
                    >Update</button>
                    :

                    <button
                    onClick={insertProject}
                    className ="btn-btn-success mt-3"
                    >Insert</button>
                }
                
                </div>
        ) :null}
            
        
        
    </div>
  )
}

export default form