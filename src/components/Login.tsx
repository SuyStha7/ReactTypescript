import * as React from "react";
import { useState } from "react";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

// Mock existing users and emails
let existingUsers = ["existingUser1", "existingUser2"]; // Mock existing users
let existingEmails = ["existing1@example.com", "existing2@example.com"]; // Mock existing emails

const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidPassword = (password: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, 1 letter and 1 number
  return regex.test(password);
};

const isValidUsername = (username: string) => {
  const regex = /^[a-zA-Z0-9_]{3,16}$/; // 3-16 characters, alphanumeric and underscores
  return regex.test(username);
};

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

  const validateForm = () => {
    if (mode === MODE.REGISTER && !formData.username) {
      return "Username is required";
    }
    if (mode === MODE.REGISTER && !isValidUsername(formData.username)) {
      return "Username must be 3-16 characters long and contain only letters, numbers, and underscores";
    }
    if (!formData.email) {
      return "Email is required";
    }
    if (!isValidEmail(formData.email)) {
      return "Invalid email format";
    }
    if ((mode === MODE.LOGIN || mode === MODE.REGISTER) && !formData.password) {
      return "Password is required";
    }
    if (mode === MODE.REGISTER && existingUsers.includes(formData.username)) {
      return "Username already exists";
    }
    if (mode === MODE.REGISTER && existingEmails.includes(formData.email)) {
      return "Email already exists";
    }
    if ((mode === MODE.LOGIN || mode === MODE.REGISTER) && !isValidPassword(formData.password)) {
      return "Password must be at least 8 characters long and include at least one letter and one number";
    }
    if (mode === MODE.EMAIL_VERIFICATION && !formData.emailCode) {
      return "Verification code is required";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock response data
      const data = { id: new Date().getTime(), ...formData };

      console.log("Response data:", data);

      if (mode === MODE.REGISTER) {
        // Add the new user to the mock database
        existingUsers.push(formData.username);
        existingEmails.push(formData.email);

        setMessage("Registration successful! Please login.");
        setMode(MODE.LOGIN);
      } else {
        setMessage("Form submitted successfully!");
      }
      setFormData(initialValues);
    } catch (err) {
      setError("Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mt-36 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center'>
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
            Go to login?
          </div>
        )}

        {error && <div className='text-red-600'>{error}</div>}

        {message && <div className='text-green-600'>{message}</div>}
      </form>
    </div>
  );
};

export default Login;
