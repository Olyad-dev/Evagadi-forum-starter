import React, { createContext, useEffect } from 'react'
import Login from './Pages/Login'
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import { Route, Routes, useNavigate } from 'react-router-dom';
import axiosBase from './axiosConfig';
import { useState } from 'react';

export const AppState = createContext();

function App() {

  const [user, setUser] = useState({})
  const token = localStorage.getItem("token");
   const navigate = useNavigate();
   async function checkUser() {
      try {
     const data =  await axiosBase.get("/users/checkUser", {
        headers: {
         Authorization: "Bearer " + token,
       },
     });
     setUser(data)
  } catch (error) {
    console.log(error.response);
    navigate("/login");
     }
  }

   useEffect(()=>{
    checkUser();
   },[])

  return (
    <AppState.Provider value={{user, setUser}}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App
