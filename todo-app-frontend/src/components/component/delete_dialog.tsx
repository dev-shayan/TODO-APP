import { AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogCancel, AlertDialogAction, AlertDialogFooter, AlertDialogContent, AlertDialog } from "@/components/ui/alert-dialog"
import { delete_todo } from "@/actions/actions";
import toast from "react-hot-toast";
import { Todo } from "../../../todo";

export function Delete_dialog({children, task}: {children: React.ReactNode, task: Todo }) {
  const handleDelete = async () => {
    const response = await delete_todo(task.id);
    if (response.status === "success") {
      toast.success(response.message);
    } else if (response.status === "error") {
      toast.error(response.message);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
