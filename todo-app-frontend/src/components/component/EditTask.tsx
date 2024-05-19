"use client";
import React from "react";
import { Input } from "../ui/input";
import { Todo } from "../../../todo";
import { useFormState } from "react-dom";
import { edit_todo } from "@/actions/actions";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Submitbutton from "./Submitbutton";

export default function EditTask({ task }: { task: Todo }) {
  const [state, formAction] = useFormState(edit_todo, {
    status: " ",
    message: "",
  });
  const { status, message } = state;
  const handleSubmit = (formData: FormData) => {
    const id: number = task.id;
    const content: string = formData.get("edit-task") as string;
    const is_completed: boolean = task.is_completed;
    formAction({ id, content, is_completed });
  };
  useEffect(() => {
    if (status === "success") {
      toast.success(message);
    } else if (status === "error") {
      toast.error(message);
    }
  }, [state]);
  return (
    <div>
      <div className="grid gap-4 py-4">
        <form action={handleSubmit} className="grid gap-1">
          <Input
            type="text"
            defaultValue={task.content}
            minLength={3}
            maxLength={54}
            required
            name="edit-task"
          />
          <Submitbutton />
        </form>
      </div>
    </div>
  );
}
