import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist2/';


function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');


  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:task})
    axios.post(URL + 'add.php',json,{
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setTasks(tasks => [...tasks,response.data]);
      setTask('');
    }).catch (error => {
      alert(error.response.data.error)
    });
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })

    .then((response) => {
      const newListWithoutRemoved = task.filter((item) => item.id !== id);
      setTasks(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    });
  }


  useEffect(()=> {
    axios.get(URL)
    .then((response) => {
     console.log(response.data)
     setTasks(response.data)
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  },[])


  return(
 <div>
   <h3>Shopping list</h3>
<form onSubmit={save}>
  <label>New item</label>
  <input value={task} onChange={e => setTask(e.target.value)} />
  <button>Save</button>

<ol> {tasks?.map(task => (
<li key={task.id}>
  {task.description}&nbsp;
  <a href="#" className="delete" onClick={() => remove(task.id)}>
    Delete
  </a>
  </li>
))}

</ol>

 <ol>
   {tasks?.map(task => (
     <li key={task.id}>{task.description}</li>
   ))}
 </ol>
 </form>
 </div>

  );
}

export default App;