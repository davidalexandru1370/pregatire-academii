import React from "react";
import axios from "axios";

export const base_url = "https://localhost:7199/";

export const ENDPOINTS = {
  Register: "register",
};

export const createAPIEndpoint = (endpoint) => {
  let url = base_url + "api/User/" + endpoint;
  const postHeader = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  return {
    post: (newRecord) => {
      return axios.post(url, newRecord, {
        withCredentials: true,
        headers: postHeader,
      });
    },
  };
};
