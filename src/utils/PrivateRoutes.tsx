import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { useEffect, useState } from "react";
import { checkStatus } from "../services/firebaseRequest";
import Loader from "../components/loader/Loader";

const PrivateRoutes = () => {
  const dispatch = useAppDispatch();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const res = await dispatch(checkStatus()).unwrap();
        setIsUserAuthenticated(res === "user");
      } catch (err) {
        console.error(err);
        setIsUserAuthenticated(false);
      }
    };

    checkUserStatus();
  }, []);

  if (isUserAuthenticated === null) {
    return <Loader />;
  }

  return isUserAuthenticated ? <Outlet /> : <Navigate to="/connection" />;
};

export default PrivateRoutes;
