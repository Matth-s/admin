import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData, getBookingData } from "./services/firebaseRequest";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import Home from "./pages/home/Home";
import CreateMaterial from "./pages/createMaterial/CreateMaterial";
import ViewMaterial from "./pages/viewMaterial/ViewMaterial";
import Error from "./pages/Error/Error";
import Connection from "./pages/connection/Connection";
import Booking from "./pages/booking/Booking";
import EditMaterial from "./pages/editMaterial/EditMaterial";

import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const [isLoadingMaterial, setIsLoadingMaterial] = useState<boolean>(false);
  const [isLoadingBooking, setIsLoadingBooking] = useState<boolean>(false);
  const [checkUser, setCheckUser] = useState<boolean>(true);
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUser) {
      const fetchData = () => {
        dispatch(getData())
          .unwrap()
          .catch((error) => console.log(error))
          .finally(() => setIsLoadingMaterial(false));
      };

      const fetchBooking = () => {
        dispatch(
          getBookingData({
            token,
          })
        )
          .unwrap()
          .then()
          .catch((error) => console.log(error))
          .finally(() => setIsLoadingBooking(false));
      };

      fetchData();
      fetchBooking();
    }
  }, [checkUser]);

  return (
    <div className="app">
      <Routes>
        <Route path="/connection" element={<Connection />} />
        <Route element={<PrivateRoutes setCheckUser={setCheckUser} />}>
          <Route element={<Home isLoadingMaterial={isLoadingMaterial} />} />
          <Route path="/create-material" element={<CreateMaterial />} />
          <Route path="/view-material/:id" element={<ViewMaterial />} />
          <Route
            path="/planning"
            element={<Booking isLoadingBooking={isLoadingBooking} />}
          />
          <Route path="/view-material/:id/edit" element={<EditMaterial />} />
          <Route
            path="*"
            element={<Home isLoadingMaterial={isLoadingMaterial} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
