import React from "react";
import Dialog from "@/components/component/dialog";
import Table from "@/components/component/table";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <main className="flex flex-col justify-center items-center mt-20">
      <section>
        <Dialog
          title="Add task"
          task_content="Enter the details of your new task."
          task_placeholder="Add task"
        >
          <Button variant="outline" className="w-[290px] md:w-[625px] md:h-14 ">
            Add Task
          </Button>
        </Dialog>
      </section>
      <section className="mt-20">
        <Table/>
      </section>
    </main>
  );
}
