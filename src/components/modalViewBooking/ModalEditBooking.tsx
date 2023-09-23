import { Reservation } from "../../schema";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useState, useEffect } from "react";

import BookingForm from "../bookingForm/BookingForm";

import "./style.scss";
import {
  deleteBookingById,
  deleteDateMaterial,
  markAsCompletedById,
} from "../../services/firebaseRequest";

type Props = {
  setOpenModalEditBooking: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalEditBooking = ({ setOpenModalEditBooking }: Props) => {
  const { viewBooking } = useAppSelector((state) => state.booking);
  const { dataMaterial } = useAppSelector((state) => state.data);
  const { token } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const material = dataMaterial.filter(
    (item) => item.id === viewBooking?.materialId
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [reservation, setReservation] = useState<Reservation>(viewBooking);

  useEffect(() => {
    if (formValid) {
      console.log(reservation, "send");
    }
  }, [formValid]);

  const markAsFinish = async (id: string) => {
    await dispatch(markAsCompletedById({ id, token }))
      .unwrap()
      .then((status) => {
        if (status === 201) {
          setOpenModalEditBooking(false);
        }
      })
      .catch((error) => console.log(error))
      .finally();
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteBookingById({ id, token }))
      .then()
      .catch((error) => console.log(error));

    await dispatch(
      deleteDateMaterial({
        token,
        id: material[0].id,
        date: material[0].bookingDate,
      })
    )
      .unwrap()
      .then((status) => {
        if (status === 204) {
          setOpenModalEditBooking(false);
        }
      })
      .catch((error) => console.log(error))
      .finally();
  };

  return (
    <div className="editBookingModal-container">
      <div
        onClick={() => setOpenModalEditBooking(false)}
        className="modalBackground"
      ></div>
      <div className="modalContent">
        <div className="button-div flex">
          <button onClick={() => markAsFinish(viewBooking.id)}>
            Marquer comme terminé
          </button>
          <button onClick={() => handleDelete(viewBooking.id)}>
            Supprimer
          </button>
        </div>

        <BookingForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          booking={viewBooking}
          setBooking={setReservation}
          pricePerDay={40}
          disableDate={viewBooking.bookingDate}
          setFormValid={setFormValid}
        />
      </div>
    </div>
  );
};

export default ModalEditBooking;
