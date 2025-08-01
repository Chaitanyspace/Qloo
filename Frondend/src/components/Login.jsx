import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URLS } from "../config/api";

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    
    const params = new URLSearchParams();
    params.append("username", form.username);
    params.append("password", form.password);

    try {
      const res = await fetch(API_URLS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      const data = await res.json();

      if (res.ok) {
        onLogin(data.access_token);
      } else {
        setError(data.detail || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-muted p-12 rounded-xl border shadow-sm space-y-8 flex flex-col justify-center">
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
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-4 rounded transition text-lg font-semibold flex items-center justify-center gap-2"
      >
        {isLoading && (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        )}
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default Login;