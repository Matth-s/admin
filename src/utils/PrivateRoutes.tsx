import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { useEffect, useState } from "react";
import { checkStatus } from "../services/firebaseRequest";
import Loader from "../components/loader/Loader";

type Props = {
  setCheckUser: React.Dispatch<React.SetStateAction<boolean>>;
};

const PrivateRoutes = ({ setCheckUser }: Props) => {
  const dispatch = useAppDispatch();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      await dispatch(checkStatus())
        .unwrap()
        .then((res) => {
          if (res === "user") {
            setIsUserAuthenticated(true);
          } else {
            setIsUserAuthenticated(false);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setCheckUser(false));
    };

    checkUserStatus();
  }, []);

  if (isUserAuthenticated === null) {
    return <Loader />;
  }

  return isUserAuthenticated ? <Outlet /> : <Navigate to="/connection" />;
};

export default PrivateRoutes;
