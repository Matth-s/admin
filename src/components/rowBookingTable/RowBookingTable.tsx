import { Reservation } from "../../schema";
import { useState } from "react";

import { createPortal } from "react-dom";
import ModalEditBooking from "../modalViewBooking/ModalEditBooking";
import { useAppDispatch } from "../../store/hooks";
import { setViewBooking } from "../../store/bookingSlice";

import "./style.scss";

type Props = {
  booking: Reservation;
};

const RowBookingTable = ({ booking }: Props) => {
  const dispatch = useAppDispatch();
  const [openModalEditBooking, setOpenModalEditBooking] =
    useState<boolean>(false);

  const handleEdit = (booking: Reservation) => {
    dispatch(setViewBooking(booking));
    setOpenModalEditBooking(true);
  };

  return (
    <>
      {openModalEditBooking &&
        createPortal(
          <ModalEditBooking
            setOpenModalEditBooking={setOpenModalEditBooking}
          />,
          document.body
        )}

      <tr>
        <td>{booking.bookingDate[0]}</td>
        <td>{booking.bookingDate[booking.bookingDate.length - 1]}</td>
        <td>{booking.firstName}</td>
        <td>{booking.lastName}</td>
        <td>{booking.address}</td>
        <td>{booking.city}</td>
        <td>{booking.phone}</td>
        <td>{booking.materialName}</td>
        <td>{booking.bookingDate.length}</td>
        <td>{booking.total + booking.downPayment} €</td>
        <td>
          <img
            src={`../assets/${booking.isCompleted ? "check" : "cross"}.svg`}
            alt="icon"
          />
        </td>
        <td>
          <button onClick={() => handleEdit(booking)}>
            <img src="../assets/edit.svg" alt="edit" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default RowBookingTable;
