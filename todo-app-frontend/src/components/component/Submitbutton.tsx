import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export default function Submitbutton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant={"default"}
      disabled={pending}
      type="submit"
      className="w-full mt-3 disabled:opacity-100 bg-black hover:bg-black/90"
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
            viewBox="0 0 24 24"
          >
            <circle
              className=""
              cx="12"
              cy="12"
              r="10"
              stroke="black"
              strokeWidth="4"
            ></circle>
            <path className="" fill="white" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        </div>
      ) : (
        "Save"
      )}
    </Button>
  );
}
