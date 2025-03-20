import React, { useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axiosBase from '../axiosConfig';

function Register() {

  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

const navigate = useNavigate();

async function handleSubmit(e) {
  e.preventDefault();

  const usernameValue = userNameDom.current.value;
  const firstnameValue = firstNameDom.current.value;
  const lastnameValue = lastNameDom.current.value;
  const emailValue = emailDom.current.value;
  const passwordValue = passwordDom.current.value;

  if (!usernameValue || !firstnameValue || !lastnameValue || !emailValue || !passwordValue) {
    alert("please provide all required information");
    return
  }

  try {
    await axiosBase.post("/users/register", {
      username: usernameValue,
      firstname: firstnameValue,
      lastname: lastnameValue,
      email: emailValue,
      password: passwordValue,
    });
    alert("register successfull, please login");
    navigate("/login");
  } catch (error) {
    alert(error?.response?.data?.msg);
  }
}

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Username :---</span>
          <input ref={userNameDom} type="text" placeholder="username" />
        </div>
        <br />
        <div>
          <span>First name :---</span>
          <input ref={firstNameDom} type="text" placeholder="First name" />
        </div>
        <br />
        <div>
          <span>Last name :---</span>
          <input ref={lastNameDom} type="text" placeholder="Last name" />
        </div>
        <br />
        <div>
          <span>Email :---</span>
          <input ref={emailDom} type="text" placeholder="Email" />
        </div>
        <br />
        <div>
          <span>Password :---</span>
          <input ref={passwordDom} type="text" placeholder="Password" />
        </div>
        <br />
        <button type="submit">Register</button>
      </form>
      <br />
      <Link to={"/login"}>login</Link>
    </section>
  );
  
}

export default Register
