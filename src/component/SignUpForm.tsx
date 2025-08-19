/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import "./SignUpForm.css";
import { Link } from "react-router-dom";
import { GoogleIcon } from "../icons/CustomIcons";
import { Button, Divider, Typography } from "@mui/material";
import { API_BASE_URL, OAUTH2_BASE_URL } from "../config/Config";
import Header from "./Header";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type TSignUpSchema } from "../lib/types";
import { toast } from "react-hot-toast";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: TSignUpSchema): Promise<void> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, data, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="register-wrapper">
      <Header shownav={false}></Header>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h1 className="register-h1">Sign Up</h1>
        <h3 className="register-h3">Sign up to continue</h3>

        {errors.username && (
          <p className="register-input-error">{`${errors.username.message}`}</p>
        )}
        <input
          {...register("username")}
          placeholder="Username"
          className="register-input"
        />

        {errors.email && (
          <p className="register-input-error">{`${errors.email.message}`}</p>
        )}
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="register-input"
        />

        {errors.password && (
          <p className="register-input-error">{`${errors.password.message}`}</p>
        )}
        <div className="password-container">
          <input
            {...register("password")}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            className="register-input"
          />
          <span onClick={togglePasswordVisibility}>
            {showPassword ? <FaIcons.FaEyeSlash /> : <FaIcons.FaEye />}
          </span>
        </div>

        <button
          className="register-btn"
          type="submit"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "Submitting..." : "Sign up"}
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
        <Typography sx={{ textAlign: "center" }} className="login_typography">
          Already have an account?{" "}
          <Link to="/login" className="login_link">
            Sign in
          </Link>
        </Typography>
      </form>
    </div>
  );
}
