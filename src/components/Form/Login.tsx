import * as React from "react";
import { useState } from "react";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const Login = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    emailCode: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "LOGIN"
      : mode === MODE.REGISTER
      ? "REGISTER"
      : mode === MODE.RESET_PASSWORD
      ? "Reset your password"
      : "Email verification";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Password"
      : "Verify email";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData(initialValues);
    
    // use the form data and hit one API (any dummy API), simply make an API call and pass the name information to that API
    // call and that should be POST method
    console.log("formData:", formData);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.username,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };

  return (
    <div className='mt-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center'>
      <form
        className='flex flex-col gap-6'
        onSubmit={handleSubmit}>
        <h1 className='text-2xl font-semibold text-center'>{formTitle}</h1>
        {mode === MODE.REGISTER && (
          <div className='flex flex-col gap-2'>
            <label className='text-[15px] text-gray-700 font-medium'>
              Username
            </label>
            <input
              type='text'
              name='username'
              placeholder='John'
              className='ring-2 ring-gray-300 rounded-md p-4 focus:outline-orange-300'
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        )}

        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className='flex flex-col gap-2'>
            <label className='text-[15px] text-gray-700 font-medium'>
              Email
            </label>
            <input
              type='email'
              name='email'
              placeholder='john@example.com'
              className='ring-2 ring-gray-300 rounded-md p-4 focus:outline-orange-300'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            <label className='text-[15px] text-gray-700 font-medium'>
              Verification Code
            </label>
            <input
              type='text'
              name='emailCode'
              placeholder='Code'
              className='ring-2 ring-gray-300 rounded-md p-4 focus:outline-orange-300'
              value={formData.emailCode}
              onChange={handleChange}
            />
          </div>
        )}

        {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
          <div className='flex flex-col gap-2'>
            <label className='text-[15px] text-gray-700 font-medium'>
              Password
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              className='ring-2 ring-gray-300 rounded-md p-4 focus:outline-orange-300'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        )}

        {mode === MODE.LOGIN && (
          <div
            className='text-sm underline tracking-wide cursor-pointer'
            onClick={() => setMode(MODE.RESET_PASSWORD)}>
            Forget password?
          </div>
        )}

        <button
          className='bg-orange-500 text-white p-2 rounded-md disabled:bg-orange-200 disabled:cursor-not-allowed'
          disabled={isLoading}>
          {isLoading ? "Loading..." : buttonTitle}
        </button>

        {mode === MODE.LOGIN && (
          <div
            className='text-sm underline tracking-wide cursor-pointer'
            onClick={() => setMode(MODE.REGISTER)}>
            Don't have an account?
          </div>
        )}

        {mode === MODE.REGISTER && (
          <div
            className='text-sm underline tracking-wide cursor-pointer'
            onClick={() => setMode(MODE.LOGIN)}>
            Have an account?
          </div>
        )}

        {mode === MODE.RESET_PASSWORD && (
          <div
            className='text-sm underline tracking-wide cursor-pointer'
            onClick={() => setMode(MODE.LOGIN)}>
            Go to an login?
          </div>
        )}

        {error && <div className='text-red-600'>{error}</div>}

        {message && <div className='text-green-600'>{message}</div>}
      </form>
    </div>
  );
};

export default Login;
