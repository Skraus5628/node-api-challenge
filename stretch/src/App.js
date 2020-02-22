import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';




function App() {

  const [projects, setProjects] = useState();

  useEffect(() => {
     axios
      .get('http://localhost:4000/projects')
        .then(res => {
          console.log(res.data)
          setProjects(res.data);
        })
        .catch(err =>{
          console.log(err)
        })
  }, [])

  return (
    <div className="App">
      <h1>testing</h1>
      {projects && projects.map(project =>(
        <div className="card">
          <h1>{project.name}</h1>
          </div>
      ))}
    </div>
  );

  }

export default App;
