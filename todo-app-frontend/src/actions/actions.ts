"use server";
import { revalidatePath } from "next/cache";
export async function add_todo(
  state: { status: string; message: string },
  formdata: FormData
) {
  const new_todo = formdata.get("add-task") as string;
  //Todo add validation through the Zod library or Yup
  try {
    const response = await fetch("http://localhost:8000/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: new_todo }),
    });
    revalidatePath("/todos");

    return { status: "success", message: "Todo added successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to add todo" };
  }
}
// Edit todo
export async function edit_todo(
  state: { status: string; message: string },
  {
    id,
    content,
    is_completed,
  }: { id: number; content: string; is_completed: boolean }
) {
  // const new_todo = formdata.get("add-task") as string;

  //Todo add validation through the Zod library or Yup
  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        content: content,
        is_completed: is_completed,
      }),
    });
    revalidatePath("/todos");

    return { status: "success", message: "Todo edited successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to edit todo" };
  }
}
export async function status_change(
  id: number,
  content: string,
  is_completed: boolean
) {
  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: content, is_completed: !is_completed }),
    });
    revalidatePath("/todos");
    return { status: "success", message: "Status Changed successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to change todo status" };
  }
}
//Delete todo

export async function delete_todo(id: number) {
  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidatePath("/todos/");
    return { status: "success", message: "Todo deleted successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to delete todo" };
  }
}
