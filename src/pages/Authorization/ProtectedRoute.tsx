import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../Models/ProtectedRouteProps";
//@ts-ignore
import { AuthorizeUser } from "../../api/UserAPI.ts";

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  page,
  redirectPage,
}: ProtectedRouteProps): any => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const fetched = useRef<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();
    if (fetched.current === true) {
      return;
    }

    let authorized = (async () => {
      return await AuthorizeUser();
    })();
    (async () => {
      await authorized.then((value) => {
        setIsAuthorized(value);
      });
    })();
    fetched.current = true;

    return () => {
      abortController.abort();
    };
  }, [fetched]);

  if (isAuthorized !== undefined) {
    if (isAuthorized === false) {
      return <Navigate to={redirectPage} replace />;
    }
    return page;
  }
  return <></>;
};
