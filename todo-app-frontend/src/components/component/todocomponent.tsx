import { Todo } from "../../../todo";
import Single_todo from "./single_todo";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableHeader,
} from "../ui/table";

export default async function Todocomponent() {
  let todo_list: Todo[] = [];

  try {
    const response = await fetch("http://127.0.0.1:8000/todos/", {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(
        `Error fetching todos: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      todo_list = data.sort((a: Todo, b: Todo) => a.id - b.id);
    } else {
      console.error("Expected an array but received:", data);
    }
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }

  return (
    <Table className="table-auto w-full border-gray-200 h-full">
      <TableHeader>
        <TableRow className="flex justify-between items-center gap-20 mb-3">
          <TableHead className="text-left text-black dark:text-white">Task</TableHead>
          <TableHead className="text-right text-black dark:text-white">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todo_list.length > 0 ? (
          todo_list.map((task) => <Single_todo key={task.id} task={task} />)
        ) : (
          <TableRow className="ml-10">
            <td colSpan={2} className="text-center font-bold">
              No tasks found^^
            </td>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
