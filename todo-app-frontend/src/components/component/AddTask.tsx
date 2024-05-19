"use client"
import React from "react";
import { Input } from "../ui/input";
import { useFormState } from "react-dom";
import { add_todo } from "@/actions/actions";
import { useEffect,useRef } from "react";
import toast from "react-hot-toast";
import Submitbutton from "./Submitbutton";


export default function AddTask() {

  const [ state, formAction] = useFormState(add_todo, { status: " ", message: "" });
  const {status, message} = state;
  useEffect(() => {
    if (status === "success") {
      ref.current?.reset();
      toast.success(message);
    } else if (status === "error"){
      toast.error(message);
    }
  }, [state]);
  const ref = useRef<HTMLFormElement>(null);
  
  return (
    <div>
      <div className="grid gap-4 py-4">
        <form action={formAction} ref={ref} className="grid gap-1">
          <Input
            type="text"
            placeholder="Add Task here"
            minLength={3}
            maxLength={54}
            required
            name="add-task"
          />
          <Submitbutton />
        </form>
      </div>
    </div>
  );
}
