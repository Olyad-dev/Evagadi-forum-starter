import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosBase from '../axiosConfig';

function Login() {

    const emailDom = useRef();
    const passwordDom = useRef();
  

async function handleSubmit(e) {
  e.preventDefault();

  const emailValue = emailDom.current.value;
  const passwordValue = passwordDom.current.value;

  if (
    !emailValue ||
    !passwordValue
  ) {
    alert("please provide all required information");
    return;
  }

    try {
      const {data} = await axiosBase.post("/users/login", {
      email: emailValue,
      password: passwordValue,
    });
    alert("user login successful");

    localStorage.setItem("token", data.token)
    
    navigate("/");
  } catch (error) {
    alert(error?.response?.data?.msg);
  }
}


  const navigate = useNavigate();
  return (
    <section>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <br />
      <Link to={"/register"}>register</Link>
    </section>
  );
}

export default Login
