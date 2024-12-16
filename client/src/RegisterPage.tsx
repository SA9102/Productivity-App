import { useState } from "react";
import axios from "axios";
import "./styles/LoginPage.css";

type props = {
  onBackToMain: () => void;
};

const RegisterPage = ({ onBackToMain }: props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:3000/registerUser",
        // url: "https://todo-app-backend-b4tv.onrender.com/registerUser",
        data: { username, password },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button className="btn-back" onClick={onBackToMain}>
        Back
      </button>
      <p>Create Account</p>
      <p>Username</p>
      <input
        className="input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p>Password</p>
      <input
        className="input"
        type="password"
        name=""
        id=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmitForm}>Register</button>
    </div>
  );
};

export default RegisterPage;
