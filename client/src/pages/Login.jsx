import React from "react";
import { Input, Section, SubmitBtn } from "../components";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const err = { msg: "" };
  try {
    await customFetch.post("/auth/login", data);
    toast.success("logged in successfully!", { autoClose: 500 });
    return redirect("/dashboard");
  } catch (error) {
    err.msg = error?.response?.data?.msg || error.msg;
    return err;
  }
};

const Login = () => {
  const err = useActionData();
  return (
    <main className="page" style={{ height: "100vh" }}>
      <Section title="Login" classNames="clean-form dark">
        <Form method="post">
          {err && <p className="text-danger">{err.msg}</p>}
          <Input type="email" label="Email" name="email" id="login-email" />
          <Input
            type="password"
            label="Password"
            name="password"
            id="login-password"
          />
          <SubmitBtn text="login" />
          <div className="text-center">
            <Link to="/register">not register? create new!</Link>
          </div>
        </Form>
      </Section>
    </main>
  );
};

export default Login;
