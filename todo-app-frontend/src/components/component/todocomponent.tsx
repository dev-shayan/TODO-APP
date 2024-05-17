import { Todo } from "../../../todo";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow, TableBody, Table } from "@/components/ui/table";
import { FiEdit } from "react-icons/fi";
import Dialog from "@/components/component/dialog";
import { Delete_dialog } from "./delete_dialog";

export default async function Todocomponent() {
  const response = await fetch("http://localhost:8000/todos");
  const task: Todo[] = await response.json();
  console.log(task);
  
  const TaskRow = ({ id, task }: any) => (
    <TableRow className="flex justify-between">
      <TableCell>
        <div className="flex items-center gap-2">
          <span>{id}</span>
          <span>{task}</span>
        </div>
      </TableCell>
      <TableCell className="text-right items-center flex gap-1 mr-3  ">
        <Checkbox
          className={` ${
            task.is_completed ? "bg-black" : "bg-white"
          } mt-[1px] mr-[2px]  border-2`}
        />
        <Delete_dialog>
          <TrashIcon className="w-5" />
        </Delete_dialog>
        <Dialog
          title="Edit Task"
          task_content="Edit your previous task here."
          task_placeholder="Edit your Task here"
        >
          <FiEdit size={18} />
        </Dialog>
      </TableCell>
    </TableRow>
  );
  return (
    <div className="flex flex-col">
      <div className="border rounded-lg overflow-hidden w-[290px] md:w-[625px]">
        <Table>
          <TableBody>
            {task.map((task: Todo, index: number) => (
              <TaskRow key={task.id} id={index + 1} task={task.content} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
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
