import React, { createContext, useContext } from "react";
import { Footer, Navbar, Section } from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const DashBoardContext = createContext();

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await customFetch("/auth/logout");
    navigate("/");
    toast.success("logout successfull");
  };
  return (
    <DashBoardContext.Provider value={{ logout }}>
      <Navbar />
      <main className="page">
        <Section classNames="clean clean-form dark">
          <Outlet />
        </Section>
      </main>
      <Footer />
    </DashBoardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashBoardContext);
};

export default Dashboard;
