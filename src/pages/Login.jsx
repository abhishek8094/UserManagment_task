import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { appLogin } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email:email,
      password:password
    }
    try {
      const response = await dispatch(appLogin(userData));
      if(response.meta.requestStatus === "fulfilled"){
        navigate("/UsersList")
      }else{
        console.log("h")
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="flex items-center justify-center  bg-gray-100 p-16">
    <div className="p-6 bg-white rounded-lg shadow-md w-96">
      <h2 className="mb-4 text-2xl font-bold text-center ">Login</h2>
      <form onSubmit={handleLogin}>
        <label
          htmlFor="email"
          className="block text-xl font-medium text-black"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Enter your Email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          className="w-full px-3 py-2 mt-2 mb-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none "
        />
        <label
          htmlFor="password"
          className="block mt-2 text-xl font-medium text-black"
        >
          Password
        </label>
        <div className="relative mt-2">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none "
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-gray-600 right-2 top-2"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-full py-2 mt-4 text-white bg-green-500 rounded-full hover:bg-green-600 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  );
};

export default Login;
