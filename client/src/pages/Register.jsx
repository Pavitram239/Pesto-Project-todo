import React from "react";
import { Input, Section, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";

import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const err = { msg: "" };
  try {
    await customFetch.post("/auth/register", data);
    toast.info("verify email then login", { autoClose: 500 });
    return redirect("");
  } catch (error) {
    err.msg = error?.response?.data?.msg || error.msg;
    return err;
  }
};

const Register = () => {
  return (
    <main className="page" style={{ height: "100vh" }}>
      <Section title="Register" classNames="clean-form dark">
        <Form method="post">
          <Input type="text" label="Name" name="name" id="register-name" />
          <Input type="email" label="Email" name="email" id="register-email" />
          <Input
            type="password"
            label="Password"
            name="password"
            id="register-password"
          />
          <SubmitBtn text="login" />
          <div className="text-center">
            <Link to="/">already registered? login!</Link>
          </div>
        </Form>
      </Section>
    </main>
  );
};

export default Register;
