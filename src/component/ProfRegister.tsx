/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./ProfRegister.css";
import { API_BASE_URL } from "../config/Config";
import axios from "axios";
import Header from "./Header";
import { useForm } from "react-hook-form";
import {
  professionalRegisterSchema,
  type TProfessionalRegisterSchema,
} from "../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export default function ProfRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TProfessionalRegisterSchema>({
    resolver: zodResolver(professionalRegisterSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: TProfessionalRegisterSchema): Promise<void> => {
    try {
      const jwt = sessionStorage.getItem("jwt");
      const response = await axios.post(
        `${API_BASE_URL}/professionals/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      toast.success(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="prof-register-wrapper">
      <Header shownav={false}></Header>
      <form onSubmit={handleSubmit(onSubmit)} className="prof-register-form">
        <h1 className="prof-register-h1">Register as a Professional</h1>
        {errors.firstName && (
          <p className="prof-register-input-error">{`${errors.firstName.message}`}</p>
        )}
        <input
          {...register("firstName")}
          placeholder="First Name"
          className="prof-register-input"
        />
        {errors.lastName && (
          <p className="prof-register-input-error">{`${errors.lastName.message}`}</p>
        )}
        <input
          {...register("lastName")}
          placeholder="Last Name"
          className="prof-register-input"
        />
        {errors.profession && (
          <p className="prof-register-input-error">{`${errors.profession.message}`}</p>
        )}
        <input
          {...register("profession")}
          placeholder="Profession"
          className="prof-register-input"
        />
        {errors.location && (
          <p className="prof-register-input-error">{`${errors.location.message}`}</p>
        )}
        <input
          {...register("location")}
          placeholder="Location"
          className="prof-register-input"
        />
        {errors.description && (
          <p className="prof-register-input-error">{`${errors.description.message}`}</p>
        )}
        <input
          {...register("description")}
          placeholder="Description"
          className="prof-register-input"
        />
        {errors.phone && (
          <p className="prof-register-input-error">{`${errors.phone.message}`}</p>
        )}
        <input
          {...register("phone")}
          placeholder="Phone Number"
          className="prof-register-input"
        />
        <button
          className="prof-register-btn"
          type="submit"
          disabled={isSubmitting || !isValid}
        >
          Register as a Professional
        </button>
      </form>
    </div>
  );
}
