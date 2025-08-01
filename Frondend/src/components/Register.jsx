import React, { useState } from "react";
import { API_URLS } from "../config/api";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch(API_URLS.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.msg || data.detail);
    } catch (err) {
      setMessage("Registration failed. Try again.");
    }
  };

  return (
    <div className="w-full h-full bg-muted p-8 rounded-xl border shadow-sm space-y-6 flex flex-col justify-center">
      {/* Title inside form */}
      <h1 className="font-extrabold text-center mb-2" style={{fontSize: '50px'}}>
        LaunchLens
      </h1>
      <p className="text-center text-gray-600 mb-6 text-sm italic">
        Clean, memorable, conveys clear market vision
      </p>
      <input
        className="w-full px-6 py-4 border rounded bg-yellow-100 text-lg"
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        className="w-full px-6 py-4 border rounded bg-yellow-100 text-lg"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        onClick={handleRegister}
        className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-4 rounded transition text-lg font-semibold"
      >
        Register
      </button>
      {message && <p className="text-sm text-gray-700 text-center">{message}</p>}
      <p className="text-center mt-4">
       
      </p>
    </div>
  );
};

export default Register;