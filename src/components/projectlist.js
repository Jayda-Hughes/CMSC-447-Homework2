



import React from 'react'
import APIService from '../components/APIService';
function projectlist(props) {

    const editProject = (project)=>{
        props.editProject(project)
    }

    const deleteProject =(projectlist) => {
        APIService.DeleteProject(project.id)
        .then (()=>props.deleteProject(project))
    }
  return (
    <div>
    {props.project && props.project.map(project => {
        return(
          <div key= {project.id}>
            <p> {project.Name} </p> 
            <p> {project.Points}</p>

            <div className='row'>
                <div className='col-md-1'>
                    <button className="btn btn-primary"
                    onClick={() => editProject(project)}
                    >Update</button>

                </div>
                <div className='col'>
                    <button className="btn btn-danger"
                     onclick = {()=> deleteProject(project)}
                     >Delete</button>
                   
                </div>

            </div>
            <hr/>
    </div>
       )
      })}
    </div>
  )
}

export default projectlist