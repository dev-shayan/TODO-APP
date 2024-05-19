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
