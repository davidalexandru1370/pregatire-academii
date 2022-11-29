import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../Models/ProtectedRouteProps";
//@ts-ignore
import { AuthorizeUser } from "../../api/UserAPI.ts";

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  page,
  redirectPage,
}: ProtectedRouteProps): ReactElement => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(
    undefined
  );

  let authorized = (async () => {
    return await AuthorizeUser();
  })();
  (async () => {
    await authorized.then((value) => {
      setIsAuthorized(value);
    });
  })();

  if (isAuthorized === false) {
    return <Navigate to={redirectPage?.toString()!} replace />;
  }
  return <>{page}</>;
};
