import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "./services/firebaseRequest";
import { useAppDispatch } from "./store/hooks";

import Home from "./pages/home/Home";
import CreateMaterial from "./pages/createMaterial/CreateMaterial";
import ViewMaterial from "./pages/viewMaterial/ViewMaterial";
import Error from "./pages/Error/Error";
import Connection from "./pages/connection/Connection";

import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getData())
        .unwrap()
        .catch(() => navigate("/error"))
        .finally(() => setIsLoading(false));
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/connection" element={<Connection />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home isLoading={isLoading} />} />
          <Route path="/create-material" element={<CreateMaterial />} />
          <Route path="/view-material/:id" element={<ViewMaterial />} />
        </Route>
        <Route path="*" element={<Home isLoading={isLoading} />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
