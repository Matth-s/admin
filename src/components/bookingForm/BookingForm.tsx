import React, { useEffect, useState } from "react";
import {
  checkIsEmpty,
  checkEmailAdress,
  checkPhoneNumber,
} from "../../helpers/checkFieldForm";

import { formatPhoneNumber } from "../../helpers/format";
import { Reservation } from "../../schema";
import DatePickter from "../datePicker/DatePickter";

type Props = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  booking: Reservation;
  setBooking: React.Dispatch<React.SetStateAction<Reservation>>;
  pricePerDay: number;
  disableDate: string[] | [];
  setFormValid: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookingForm = ({
  isLoading,
  setIsLoading,
  booking,
  setBooking,
  pricePerDay,
  disableDate,
  setFormValid,
}: Props) => {
  const [bookingDate, setBookingDate] = useState<[] | string[]>(
    booking.bookingDate
  );

  useEffect(() => {
    setBooking((prevBooking) => {
      return {
        ...prevBooking,
        bookingDate: bookingDate,
        total: bookingDate.length * pricePerDay,
      };
    });
  }, [bookingDate]);

  const onChangeReservation = (name: string, value: string) => {
    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value.trim());
      setBooking((prevReservation) => ({
        ...prevReservation,
        phone: formattedPhone,
      }));
    } else {
      setBooking((prevReservation) => ({
        ...prevReservation,
        [name]: value.trim(),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const emailError = checkEmailAdress(booking.email);
    const phoneError = checkPhoneNumber(booking.phone);
    const cityError = checkIsEmpty(booking.city);
    const adressError = checkIsEmpty(booking.address);

    if (emailError && phoneError) {
      console.error(
        "Veuillez fournir soit un email valide soit un numéro de téléphone valide."
      );
      return;
    }

    if (cityError) {
      console.error(cityError);
      return;
    }

    if (adressError) {
      console.error(adressError);
      return;
    }

    if (booking.bookingDate.length === 0) {
      return console.error("slectioone des dates");
    }

    setFormValid(true);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-div">
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          defaultValue={booking.lastName}
          onChange={(e) => onChangeReservation(e.target.name, e.target.value)}
        />
      </div>

      <div className="form-div">
        <label htmlFor="firstName">Prénom</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          defaultValue={booking.firstName}
          onChange={(e) => onChangeReservation(e.target.name, e.target.value)}
        />
      </div>

      <div className="form-div">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="exemple@email.com"
          defaultValue={booking.email}
          onChange={(e) => onChangeReservation(e.target.name, e.target.value)}
        />
      </div>

      <div className="form-div">
        <label htmlFor="phone">Numéro de téléphone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="XX XX XX XX XX"
          defaultValue={booking.phone}
          onChange={(e) => onChangeReservation(e.target.name, e.target.value)}
        />
      </div>

      <div className="form-div">
        <label htmlFor="city">Ville</label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Pau"
          defaultValue={booking.city}
          onChange={(e) => onChangeReservation(e.target.name, e.target.value)}
        />
      </div>

      <div className="form-div">
        <label htmlFor="address">Adresse</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="12 rue des jonquilles"
          defaultValue={booking.address}
          onChange={(e) => onChangeReservation(e.target.name, e.target.value)}
        />
      </div>

      <DatePickter disableDate={disableDate} setBookingDate={setBookingDate} />

      <input
        className={isLoading ? "loading" : ""}
        type="submit"
        value={isLoading ? "Création de la réservation" : "Ajouter"}
      />
    </form>
  );
};

export default BookingForm;
