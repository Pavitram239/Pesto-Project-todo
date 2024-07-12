import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ params }) => {
  const { id } = params;
  const confirmDelete = window.confirm(
    "Are you sure you want to delete the task?"
  );
  if (confirmDelete) {
    try {
      await customFetch.delete(`/tasks/${id}`);
      toast.success("task deleted!");
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.message);
    }
  }
  return redirect("/dashboard");
};
