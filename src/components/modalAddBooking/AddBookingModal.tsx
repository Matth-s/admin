import React, { useState, useEffect } from "react";
import { Reservation } from "../../schema";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addDateBookingToMaterial,
  createBooking,
} from "../../services/firebaseRequest";

import { useNavigate } from "react-router-dom";

import "./style.scss";
import BookingForm from "../bookingForm/BookingForm";

type Props = {
  setOpenBookingModal: React.Dispatch<React.SetStateAction<boolean>>;
  disableDate: string[] | [];
  pricePerDay: number;
  downPayment: number;
  materialId: string;
  materialName: string;
};

const AddBookingModal = ({
  setOpenBookingModal,
  disableDate,
  materialId,
  pricePerDay,
  downPayment,
  materialName,
}: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [reservation, setReservation] = useState<Reservation>({
    email: "",
    phone: "",
    city: "",
    address: "",
    firstName: "",
    lastName: "",
    bookingDate: [],
    downPayment: downPayment,
    downPaymentIsPaid: false,
    total: 0,
    totalIsPaid: false,
    isCompleted: false,
    materialName: materialName,
    materialId: materialId,
    id: "",
  });

  useEffect(() => {
    if (formValid) {
      sendForm();
    }
  }, [formValid]);

  const sendForm = async () => {
    await dispatch(
      addDateBookingToMaterial({
        materialId,
        date: reservation.bookingDate,
        token,
      })
    )
      .unwrap()
      .then((status) => {
        if (status === 201) {
          navigate("/planning");
        }
      })
      .catch((error) => console.log(error));

    await dispatch(createBooking({ reservation, token }))
      .unwrap()
      .then()
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="addBookingModal-container">
      <div
        onClick={() => setOpenBookingModal(false)}
        className="modalBackground"
      ></div>
      <div className="modalContent">
        <BookingForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          booking={reservation}
          setBooking={setReservation}
          pricePerDay={pricePerDay}
          disableDate={disableDate}
          setFormValid={setFormValid}
        />
      </div>
    </div>
  );
};

export default AddBookingModal;
