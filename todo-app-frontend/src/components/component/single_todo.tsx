import React from "react";
import { Todo } from "../../../todo";
import { Delete_dialog } from "./delete_dialog";
import { FiEdit } from "react-icons/fi";
import Dialog from "./dialog";
import { Checkbox } from "../ui/checkbox";
import { TableRow, TableCell } from "../ui/table";

export default function single_todo({ task }: { task: Todo }) {
  return (
    <TableRow className="flex justify-between items-center">
      <TableCell>{task.content}</TableCell>
      <TableCell className="flex items-center gap-1">
        <Checkbox
          className={` ${
            task.is_completed ? "bg-black" : "bg-white"
          }    border-2`}
        />
        <Delete_dialog>
          <TrashIcon className="w-5" />
        </Delete_dialog>
        <Dialog
          title="Edit Task"
          task_content="Edit your previous task here."
          task_placeholder="Edit your Task here"
          editing={true}
          task={task}
        >
          <FiEdit size={18} />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
