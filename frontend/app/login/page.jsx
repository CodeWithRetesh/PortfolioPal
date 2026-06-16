"use client";

import { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
         "Content-Type": "application/json",
      },
        body: JSON.stringify({
         email,
          password,
       }),
    }
   ); 

      const data = await response.json();

      console.log(data);

      if (data.success) {

        localStorage.setItem(
          "token",
          data.token
        );

        alert("Login Successful 😎");

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <main
      style={{
        padding: "40px",
      }}
    >
      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>

      </form>
    </main>
  );
}