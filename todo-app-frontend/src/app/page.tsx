import React from "react";
import Dialog from "@/components/component/dialog";
import { Button } from "@/components/ui/button";
import Todocomponent from "@/components/component/todocomponent";

export default function page() {
  return (
    <main className="h-full max-w-2xl mx-auto mt-20">
      <section className="flex justify-center items-center">
        <Dialog
          title="Add task"
          task_content="Enter the details of your new task."
          task_placeholder="Add task"
          adding={true}
        >
          <Button variant="outline" className="w-[290px] md:w-[625px] md:h-14 ">
            Add Task
          </Button>
        </Dialog>
      </section>
      <section className="mt-10">
      <Todocomponent />
      </section>
    </main>
  );
}
