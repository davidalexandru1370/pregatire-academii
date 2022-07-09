import React from "react";
import axios from "axios";

export const base_url = "https://localhost:7199/";

export const ENDPOINTS = {
  Register: "Register",
};

export const createAPIEndpoint = (endpoint) => {
  let url = base_url + "api/Users/" + endpoint;

  return {
    post: (newRecord) => {
      return axios.post(url, newRecord);
    },
  };
};
