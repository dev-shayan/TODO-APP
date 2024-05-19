import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function EditTask() {
  return (
    <div>
      <div className="grid gap-4 py-4">
        <div className="grid gap-1">
          <Input
            type="text"
            placeholder="Edit Task here"
            minLength={3}
            maxLength={54}
            required
            name="edit-task"
          />
          <Button type="submit" className="w-full mt-3">
            Save Task
          </Button>
        </div>
      </div>
    </div>
  );
}
