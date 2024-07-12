import React from "react";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { Task } from "../components";

export const loader = async () => {
  let err = { msg: "" };
  try {
    const data = await customFetch("/tasks");
    return data.data.tasks;
  } catch (error) {
    err.msg = error?.response?.data?.msg || error.message;
    return err;
  }
};

const Tasks = () => {
  const tasks = useLoaderData();
  return (
    <div className="row">
      {tasks.msg && <h3>No Tasks</h3>}
      {tasks.length > 0 &&
        tasks.map((task, index) => {
          return <Task key={index} {...task} />;
        })}
    </div>
  );
};

export default Tasks;
