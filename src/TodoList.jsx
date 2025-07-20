import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export default function TodoList(){
    let [todo,settodo] = useState([]);
    let [newTodo, setnewTodo] = useState("");
    let taskStyle = {textDecorationLine : "line-through"}

    function Add(){
        settodo([...todo,{task:newTodo, id:uuidv4(),done : false}]);
        setnewTodo("");
    }

    function addToList(event){
        setnewTodo(event.target.value)
    }

    function deleteTodo(id){
        settodo((prevTodo)=> todo.filter((prevTodo) => prevTodo.id != id))
    }

    function markDone(id){
        settodo(todo.map(item => {
            if(item.id===id){
                return {...item,done:true}
            }else{
                return item;
            }
        }));
    }

    function markDoneAll(id){
        settodo(todo.map(item => {
                return {...item,done:true}
            }
        ));
    }

    return (
        <div>
            <h1>! To-Do-App !</h1>
            <hr />
            <div className="enter-div">Enter : &nbsp;
                <input type="text" value={newTodo} onChange={addToList} /> 
                &nbsp;
                <button className="add-btn" onClick={Add} >Add</button>
            </div>
            <h3>Tasks todo :</h3>
            <ul>
                {
                todo.map((item) =>
                        <li key={item.id}  >
                        <div className="task">
                            <span style={item.done ? taskStyle : undefined}><b>{item.task}</b></span> 
                            <div className="btn-div">
                                <button className="delete-btn" onClick={()=>deleteTodo(item.id)}>delete</button>  
                                <button className="done-btn" onClick={()=>markDone(item.id)} >done</button>
                            </div>
                        </div>
                        <hr /> 
                    </li>
                    )
                    
                }
                
            </ul>
            <button className="alldone-btn" onClick={()=>markDoneAll()} >All Done</button>
            
        </div>
    )
}