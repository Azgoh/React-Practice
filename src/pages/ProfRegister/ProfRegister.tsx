/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./ProfRegister.css";
import { API_BASE_URL } from "../../config/Config";
import axios from "axios";
import Header from "../../components/Header/Header";
import { useForm } from "react-hook-form";
import {
  professionalRegisterSchema,
  type TProfessionalRegisterSchema,
} from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";

/**
 * ProfRegister Component
 * Form for existing users to register as service professionals.
 * Collects professional details and submits to backend for profile creation.
 * Uses Zod validation for form data.
 */
export default function ProfRegister() {
  // Refresh user context after successful professional registration
  const { refreshUser } = useUser();

  // Setup form with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TProfessionalRegisterSchema>({
    resolver: zodResolver(professionalRegisterSchema),
    mode: "onTouched", // Validate on field touch
  });

  /**
   * Handle professional registration form submission
   * Sends professional details to backend API using JWT token for authentication
   */
  const onSubmit = async (data: TProfessionalRegisterSchema): Promise<void> => {
    try {
      // Retrieve JWT token from session storage
      const jwt = sessionStorage.getItem("jwt");
      
      // Submit professional registration data
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
      
      // Refresh user context to include new professional profile
      await refreshUser();
      
      // Show success notification
      toast.success(response.data);
    } catch (error: any) {
      // Show error notification with error message from API
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="prof-register-wrapper">
      <Header />
      <form onSubmit={handleSubmit(onSubmit)} className="prof-register-form">
        <h1 className="prof-register-h1">Register as a Professional</h1>
        {errors.firstName && (
          <p className="prof-register-input-error">{`${errors.firstName.message}`}</p>
        )}
        <input
          {...register("firstName")}
          placeholder="First Name"
          className="prof-register-input"
          data-test="first-name-input"
        />
        {errors.lastName && (
          <p className="prof-register-input-error">{`${errors.lastName.message}`}</p>
        )}
        <input
          {...register("lastName")}
          placeholder="Last Name"
          className="prof-register-input"
          data-test="last-name-input"
        />
        {errors.profession && (
          <p className="prof-register-input-error">{`${errors.profession.message}`}</p>
        )}
        <input
          {...register("profession")}
          placeholder="Profession"
          className="prof-register-input"
          data-test="profession-input"
        />
        {errors.location && (
          <p className="prof-register-input-error">{`${errors.location.message}`}</p>
        )}
        <input
          {...register("location")}
          placeholder="Location"
          className="prof-register-input"
          data-test="location-input"
        />
        {errors.description && (
          <p className="prof-register-input-error">{`${errors.description.message}`}</p>
        )}
        <input
          {...register("description")}
          placeholder="Description"
          className="prof-register-input"
          data-test="description-input"
        />
        {errors.phone && (
          <p className="prof-register-input-error">{`${errors.phone.message}`}</p>
        )}
        <input
          {...register("phone")}
          placeholder="Phone Number"
          className="prof-register-input"
          data-test="phone-input"
        />
        {errors.hourlyRate && (
          <p className="prof-register-input-error">{`${errors.hourlyRate.message}`}</p>
        )}
        <input
          {...register("hourlyRate")}
          placeholder="Hourly Rate"
          className="prof-register-input"
          data-test="hourly-rate-input"
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
