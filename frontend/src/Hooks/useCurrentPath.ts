import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function useCurrentPath() {
  const location = useLocation();
  return "/" + location.pathname.split("/")[1];
}
