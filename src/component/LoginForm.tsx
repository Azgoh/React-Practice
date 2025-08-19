/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL, OAUTH2_BASE_URL } from "../config/Config";
import * as FaIcons from "react-icons/fa";
import "./LoginForm.css";
import { Button, Divider, Typography } from "@mui/material";
import { GoogleIcon } from "../icons/CustomIcons";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { loginSchema, type TLoginSchema } from "../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: TLoginSchema): Promise<void> => {
    setApiError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, data, {
        headers: { "Content-Type": "application/json" },
      });
      const jwt = response.data;
      sessionStorage.setItem("jwt", jwt);
      navigate("/home");
    } catch (error: any) {
      setApiError(error.response.data.message);
    }
  };

  return (
    <div className="login-wrapper">
      <Header shownav={false}></Header>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h1 className="login-h1">Log in to continue</h1>
        <input
          {...register("identifier")}
          placeholder="Username or email"
          className="login-input"
        />
        <div className="password-container">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            className="login-input"
          />
          <span onClick={togglePasswordVisibility}>
            {showPassword ? <FaIcons.FaEyeSlash /> : <FaIcons.FaEye />}
          </span>
        </div>
        <button className="login-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            window.location.href = `${OAUTH2_BASE_URL}`;
          }}
          startIcon={<GoogleIcon />}
        >
          Continue with Google
        </Button>
        <Typography
          sx={{ textAlign: "center" }}
          className="register_typography"
        >
          Don't have an account?{" "}
          <Link to="/register" className="register_link">
            Sign up
          </Link>
        </Typography>
        {apiError && <p className="login-api-error">{apiError}</p>}
      </form>
    </div>
  );
}
