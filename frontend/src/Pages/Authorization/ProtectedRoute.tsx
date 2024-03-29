import { FC, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../Models/ProtectedRouteProps";
import { AuthorizeUser } from "../../api/UserAPI";
import { useAuthentificationContext } from "../../Context/AuthentificationContext";

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  page,
  redirectPage,
}: ProtectedRouteProps): any => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(
    undefined
  );
  const { isAuthentificated, setIsAuthentificated } =
    useAuthentificationContext();

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
        setIsAuthentificated(value);
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
