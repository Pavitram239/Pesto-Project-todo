import React from "react";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { Input, Select, SubmitBtn, Textarea } from "../components";
import { STATUS } from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  try {
    const data = await customFetch(`/tasks/${params.id}`);
    return data.data.task;
  } catch (error) {
    return redirect("/dashboard");
  }
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const err = { msg: "" };
  try {
    await customFetch.post(`/tasks/${params.id}`, data);
    toast.success("Task updated");
    return redirect("/dashboard ");
  } catch (error) {
    err.msg = error?.response?.data?.msg || error.message;
    return err;
  }
};

const AddTask = () => {
  const err = useActionData();
  const task = useLoaderData();
  return (
    <Form method="post">
      <h3 className="text-center">Add Task</h3>
      <Input
        label="Title"
        name="title"
        type="text"
        id="task-title"
        error={err && err.msg[0]}
        defaultValue={task.title}
      />
      <Textarea
        id="task-description"
        label="Description"
        name="description"
        error={err && err.msg[1]}
        defaultValue={task.description}
      />
      <Select
        name="status"
        label="Status"
        id="task-status"
        list={Object.values(STATUS)}
        error={err && err.msg[2]}
        defaultValue={task.status}
      />
      <SubmitBtn text="Add Task" />
    </Form>
  );
};

export default AddTask;
