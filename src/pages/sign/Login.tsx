import axios from "axios";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import request from "../../request";
import { useDispatch, useSelector } from "react-redux";
import { login, userState } from "../../store";
import { PrimaryButton, TextField } from "@fluentui/react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, username } = useSelector(userState);

  useEffect(() => {
    if (isAuthenticated) return navigate("/");
  }, []);

  // REF
  const formRef = useRef<HTMLFormElement | null>(null);

  // STATES
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Object[]>([]);
  const [error, setError] = useState<string | null>(null);

  // FUNCTIONS
  const onLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const target = e.target as typeof e.target & {
        email: { value: string };
        password: { value: string };
      }
      const email = target.email.value;
      const password = target.password.value;

      await axios.get('http://localhost:8000/sanctum/csrf-cookie');

      const { data } = await request.post('login', { email, password });

      dispatch(login({
        token: data.token,
        user: data.user,
        email: data.email
      }));

      navigate('/');
    } catch (err: any) {
      console.error("Error => ", err);
      if (err.message == "Request failed with status code 422") {
        setError("Les identifiants sont incorrects");
      } else {
        setError(err.message);
      }
    }
  }

  return (
    <div className="container mx-auto px-20">
      <h1>Login page</h1>
      <p>{username}</p>
      {error && <p>{error}</p>}
      <form ref={formRef} onSubmit={onLogin}>
        <TextField type="email" name="email" required label="Email" />
        <TextField type={showPassword ? 'text' : 'password'} name="password" required label="Email" />
        <a onClick={() => setShowPassword(v => v = !v)}>Show/Hide</a>
        <PrimaryButton type="submit" text="Se connecter" />
      </form>
      <Link to="/">home</Link>
    </div>
  )
}
