import { FC, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../Models/ProtectedRouteProps";
//@ts-ignore
import { AuthorizeUser } from "../api/UserAPI.ts";

export const ProtectedRoute = ({ page, redirectPage }: ProtectedRouteProps) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(undefined);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current === true) {
      return;
    }

    let authorized = (async () => { return await AuthorizeUser() })();
    (async () => {
      await authorized.then((value) => {
        setIsAuthorized(value);
      })
    })();
    fetched.current = true;

  }, [fetched])

  if (isAuthorized !== undefined) {
    if (isAuthorized === false) {
      console.log("fetched=" + fetched.current);
      console.log(isAuthorized);

      return <Navigate to={redirectPage} replace />
    }
    return page;
  }
}