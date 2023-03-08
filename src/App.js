import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    //console.log(e.target.value, e.target.name);

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/demo", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const getUsers = async () => {
    const response = await fetch("http://localhost:8080/demo", {
      method: "GET",
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);
  //  <p>{JSON.stringify(form)}</p>
  return (
    <div className="full-stack">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
        ></input>
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        ></input>
        <br />
        <input type={"submit"}></input>
        <br />
      </form>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
