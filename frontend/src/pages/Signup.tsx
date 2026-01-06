import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/axios";


export default function Signup(){
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async()=>{
        try {
            await api.post('/api/v1/auth/signup/', {email, password});
            navigate('/todo')    
        } catch (error) {
            console.log("Error in Signup ", error)
        }
    }


    return (
       <div className="h-screen flex items-center justify-center">
      <div className="w-80 space-y-4">
        <h1 className="text-2xl font-bold">Signup</h1>
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
          Signup
        </button>
        {/* 👇 Link to Signin */}
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
    )
}