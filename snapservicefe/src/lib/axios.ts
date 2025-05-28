"use client"

import axios from "axios";

export const getAPI = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  if (!baseURL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL");
  }

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
  });
};
