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
  const [isLoadingMaterial, setIsLoadingMaterial] = useState<boolean>(true);
  const [isLoadingBooking, setIsLoadingBooking] = useState<boolean>(true);
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      dispatch(getData())
        .unwrap()
        .catch(() => navigate("/error"))
        .finally(() => setIsLoadingMaterial(false));
    };

    const fetchBooking = () => {
      dispatch(
        getBookingData({
          token:
            "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFhMDhlN2M3ODNkYjhjOGFjNGNhNzJhZjdmOWRkN2JiMzk4ZjE2ZGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVzdC02MmU2MiIsImF1ZCI6InRlc3QtNjJlNjIiLCJhdXRoX3RpbWUiOjE2OTQwMjI5MTAsInVzZXJfaWQiOiI1MkpJS01xQ1FpUGdYZmpoWDUzUGNqalZXU2gxIiwic3ViIjoiNTJKSUtNcUNRaVBnWGZqaFg1M1BjampWV1NoMSIsImlhdCI6MTY5NDg5ODczMywiZXhwIjoxNjk0OTAyMzMzLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.bovH2r4RymPZA5fzNxfS33Annm7HT244aG14ZAS72c3bFwBMAcxppt-ZWjPU2ObcDR9DIXrRUvXE41wx-MjVeJkcRYdbdbk26xyrLh1mJu8uNk7aHc5cexuM_mY510ar5ut6tLluZkDxgZ8W9r2rTIn8nX_wKBW05lGqV2--ohUtPjDQpEoF-pyHi6n2kpCDNNh0FeSUxgKLrzVOHpLuDdllp9aI-FuqdvzKqUAd3M3qGB9NAYdtr0pfe3N0L42MWcgjCRRHGIFysc8IfamDSYaWawkGVzyikhFrpqpKMNwm2mlSlHZzE-IwS_tm2-fURPwuNEhpWPx8yxJMF_Qyuw",
        })
      )
        .unwrap()
        .then()
        .catch((error) => console.log(error))
        .finally(() => setIsLoadingBooking(false));
    };

    fetchData();
    fetchBooking();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/connection" element={<Connection />} />
        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={<Home isLoadingMaterial={isLoadingMaterial} />}
          />
          <Route path="/create-material" element={<CreateMaterial />} />
          <Route path="/view-material/:id" element={<ViewMaterial />} />
          <Route
            path="/planning"
            element={<Booking isLoadingBooking={isLoadingBooking} />}
          />
          <Route path="view-material/:id/edit" element={<EditMaterial />} />
        </Route>
        <Route
          path="*"
          element={<Home isLoadingMaterial={isLoadingMaterial} />}
        />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
