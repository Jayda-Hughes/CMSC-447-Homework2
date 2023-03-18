
import './App.css';
import {useState, useEffect} from 'react';
import projectlist from './components/projectlist';
import form from './compenents/form';


function App() {

  const[project, setProject]= useState([])
  const[editedProject, setEditedProject]= useState(null)

  useEffect(() =>{ 
    fetch('http://localhost:5000/get',{
      'method':'GET',
      headers: {
        'Content-Type': 'applications/json'
      }
    })
     .then(resp => resp.json())
     .then(resp => setProject(resp))
     .catch(error => console.log(error))


    },[])

    const editProject = (project) => {

      setEditedProject(project)

    }

    const updatedData = (project) =>{
      const new_project= project.map(my_project => {
        if(my_project.id === project.id){
          return project
        } else{
          return my_project
        }
      })

      setProject(new_project)
    }

    const openForm = () => {
      setEditedProject({Name:'',Points:''})
    }

    const insertedProject=(project)=> {
      const new_project=[...project,project]
      setProject(new_project)
    }

    const deleteProject=(project)=>{
      const new_project = project.filter(my_project=>{
        if(my_project.id === project.id){
          return false;
        }
        return true;
      })
      setProject(new_project)
    }
  return (
    <div className="App">
      <div className="row">
        <div className="col">
        <h1> My Flask and React Homework Assignment</h1>
        </div>

        <div className="col">
          <button
          className="btn btn-success"
          onclick ={openForm}
          > Insert </button>
        </div>
      </div>
      

        <projectlist project= {project} editProject={editProject}/>
        {editedProject? <form project={editedProject} updatedData={updatedData} insertedProject={insertedProject} deleteProject={deleteProject}/> :null}
        <form project={editedProject}/>
    </div>
  );
}

export default App;
