import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function AddTask() {
  return (
    <div>
      <div className="grid gap-4 py-4">
        <div className="grid gap-1">
          <Input
            type="text"
            placeholder="Add Task here"
            minLength={3}
            maxLength={54}
            required
            name="add-task"
          />
          <Button type="submit" className="w-full mt-3">
            Save Task
          </Button>
        </div>
      </div>
    </div>
  );
}
