import React, { useState , useEffect } from "react";
import Swal from "sweetalert2";
//import AddTask from "./components/AddTask";
import Header from "./components/Header";
import { v4 as uuidv4 } from "uuid";
import Tasks from "./components/Task";

function App(){
    const [tasks , setTasks ] = useState([]);
    const [ showAddTask , setshowAddTask ] = useState(false);
    const [loading, setloading] = useState(true); 
    useEffect(() => {
        setTimeout(() => {
            setloading(false);
        }, 3500);
    }, [])
    //creating tasks
    const AddTask = (task) =>{
        const id = uuidv4();
        const newTask ={ id , ...task}
        setTasks([...task, newTask])
        Swal.fire({
            icon : "Success",
            title : 'Yay',
            text : 'You have successfully added a task !',
        })
        localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
    };
        // Delete Task
        const deleteTask = (id) => {
            const deleteTask = tasks.filter((task) => task.id !== id);
            setTasks(deleteTask);
            Swal.fire({
                icon: 'success',
                title: 'Oops...',
                text: 'You have successfully deleted a task!'
            })
            localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
        }
            // Edit Task
    const editTask = (id) => {
        const text = prompt("Task Name");
        const day = prompt("Day and Time");
        let data = JSON.parse(localStorage.getItem('taskAdded'));
        const myData = data.map(x => {
            if (x.id === id) {
                return {
                    ...x,
                    text: text,
                    day: day,
                    id: uuidv4()
                }
            }
            return x;
        })
        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'You have successfully edited an existing task!'
        })
        localStorage.setItem("taskAdded", JSON.stringify(myData));
        window.location.reload();
    }
    return(
        <>
           {
                loading ?
                    <div className="spinnerContainer">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                    <div className="Container">
                        <Header 
                            showForm={()=>setshowAddTask(!showAddTask)}
                            changeTextAndColor={showAddTask} 
                        />
                        {showAddTask && <AddTask onSave={AddTask} />}
                        <h6 className="number-tasks">Number of tasks : {tasks.length}<br/>
                        {tasks.length > 0?
                        (<Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} />)
                        :('No Tasks Found')
                        }
                    </h6>
                    </div>
}

        </>
    )
}

export default App;