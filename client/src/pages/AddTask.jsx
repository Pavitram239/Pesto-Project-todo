import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { Input, Select, SubmitBtn, Textarea } from "../components";
import { STATUS } from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  const err = { msg: "" };
  try {
    await customFetch.post("/tasks", data);
    toast.success("Task added successfully");
    return redirect("/dashboard ");
  } catch (error) {
    err.msg = error?.response?.data?.msg || error.message;
    return err;
  }
};

const AddTask = () => {
  const err = useActionData();
  return (
    <Form method="post">
      <h3 className="text-center">Add Task</h3>
      <Input
        label="Title"
        name="title"
        type="text"
        id="task-title"
        error={err && err.msg[0]}
      />
      <Textarea
        id="task-description"
        label="Description"
        name="description"
        error={err && err.msg[1]}
      />
      <Select
        name="status"
        label="Status"
        id="task-status"
        list={Object.values(STATUS)}
        disabled
        error={err && err.msg[2]}
      />
      <input type="hidden" name="status" value={STATUS.PENDING} />
      <SubmitBtn text="Add Task" />
    </Form>
  );
};

export default AddTask;
