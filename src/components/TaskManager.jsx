// Given the completed TaskManager component, your challenge is to finish implementing the
// reducer function so that the user can add, update, and delete tasks.

// TASKS
// The user should be able to add a new task
// The user should be able to update the status of a task
// The user should be able to delete a task


import * as React from "react";
import { createTask } from "./utils";

// function reducer(tasks, action) {

//     if (action.type === "update") {

//         return tasks.map(task => (
//             task.id === action.id ? {...task, status: task.status === "pending" ? "completed": "pending"}:task
//             //if we have a match on id we create a new task object with the same propertie (keys) as the original
//             //otherwise we leave the task alone (:tasks). We return all the other tasks and the new updated task.
//         ))

//     } else if (action.type === "delete"){
//         return [
//             ...tasks.filter(task => task.id !== action.id),
//         ]
//     } else if (action.type === "add") {
//        return [
//         ...tasks,
//        action.task
//        ]
//     } else if (!action.type){
//         throw new Error("This action type isn't supported.")
//     } else {
//         return tasks
//     }
//     //always return the else

// }

function reducer(tasks, action) {
    switch(action.type) {
        case "update":
            return tasks.map(task => (
                task.id === action.id ? {...task, status: task.status === "pending" ? "completed": "pending"} :task
                //if we have a match on id we create a new task object with the same propertie (keys) as the original
//             //otherwise we leave the task alone (:tasks). We return all the other tasks and the new updated task.
            ))
        case "add":
            return [...tasks, action.task]
        case "delete":
            return tasks.filter(task => task.id !== action.id)
        default:
            return tasks;
    }
}

export default function TaskManager() {
  const [tasks, dispatch] = React.useReducer(reducer, []);
  //we can see the data type is an array, as an empty array is our default state passed into useReducer
  //we never want to mutate state so we want to return a new array with the added, updated or deleted tasks.

  const handleUpdateTaskStatus = (id) => {
    dispatch({ type: "update", id });
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: "delete", id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    dispatch({ type: "add", task: createTask(formData.get("task")) });

    e.target.reset();
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input name="task" placeholder="Task title" />
        <button className="primary" type="submit">
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <button
                className={`status ${task.status}`}
                onClick={() => handleUpdateTaskStatus(task.id)}
              />
              {task.title}
            </div>
            <button className="link" onClick={() => handleDeleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
