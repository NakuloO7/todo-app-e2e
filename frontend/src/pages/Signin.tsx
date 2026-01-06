import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/axios";


export default function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit =async()=>{
        await api.post('/api/v1/auth/signin/', {email, password});
        navigate('/todo');
    }

    return(
         <div className="h-screen flex items-center justify-center">
      <div className="w-80 space-y-4">
        <h1 className="text-2xl font-bold">Signin</h1>
        <input
          className="border w-full p-2"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border w-full p-2"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="bg-black text-white w-full p-2"
          onClick={handleSubmit}
        >
          Signin
        </button>
        {/* 👇 Link to Signin */}
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
    )
}