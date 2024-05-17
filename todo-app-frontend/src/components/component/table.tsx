import React from "react";
import Single_todo from "./single_todo";
import { Todo } from "../../../todo";
import  Todocomponent  from "./todocomponent";

export default function Table() {
  return (
    // <table className="w-full ">
    //   <thead>
    //     <tr className=" rounded-md drop-shadow-xl">
    //       {/* <th>ID</th> */}
    //       <th>Tasks</th>
    //       <th>Actions</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {task.map((task: Todo) => (
    //       <Single_todo key={task.id} task={task} />
    //     ))}
    //   </tbody>
    // </table>
    <Todocomponent />
  );
}
