import React, { useEffect, useState } from "react";
import { Reservation } from "../../schema";
import {
  checkIsEmpty,
  checkEmailAdress,
  checkPhoneNumber,
} from "../../helpers/checkFieldForm";
import { formatPhoneNumber } from "../../helpers/format";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addDateBookingToMaterial,
  createBooking,
} from "../../services/firebaseRequest";

import DatePickter from "../datePicker/DatePickter";

import "./style.scss";

type Props = {
  setOpenBookingModal: React.Dispatch<React.SetStateAction<boolean>>;
  materialId: string;
  name: string;
  disableDate: string[] | [];
};

const AddBookingModal = ({
  setOpenBookingModal,
  materialId,
  name,
  disableDate,
}: Props) => {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<[] | string[]>([]);
  const [reservation, setReservation] = useState<Reservation>({
    email: "",
    phone: "",
    city: "",
    address: "",
    firstName: "",
    lastName: "",
    bookingDate: [],
  });

  useEffect(() => {
    setReservation((prevData) => {
      return {
        ...prevData,
        bookingDate: selectedDates,
      };
    });
  }, [selectedDates]);

  console.log(reservation);

  const onChangeReservation = (name: string, value: string) => {
    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setReservation((prevReservation) => ({
        ...prevReservation,
        phone: formattedPhone,
      }));
    } else {
      setReservation((prevReservation) => ({
        ...prevReservation,
        [name]: value.trim(),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const emailError = checkEmailAdress(reservation.email);
    const phoneError = checkPhoneNumber(reservation.phone);
    const cityError = checkIsEmpty(reservation.city);
    const adressError = checkIsEmpty(reservation.address);

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

    if (reservation.bookingDate.length === 0) {
      console.error("slectioone des dates");
    }

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
          setOpenBookingModal(false);
        }
      })
      .catch((error) => console.log(error));

    await dispatch(createBooking({ reservation, name, token }))
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-div">
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) =>
                onChangeReservation(e.target.name, e.target.value)
              }
            />
          </div>

          <div className="form-div">
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={(e) =>
                onChangeReservation(e.target.name, e.target.value)
              }
            />
          </div>

          <div className="form-div">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="exemple@email.com"
              onChange={(e) =>
                onChangeReservation(e.target.name, e.target.value)
              }
            />
          </div>

          <div className="form-div">
            <label htmlFor="phone">Numéro de téléphone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="XX XX XX XX XX"
              onChange={(e) =>
                onChangeReservation(e.target.name, e.target.value)
              }
            />
          </div>

          <div className="form-div">
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Pau"
              onChange={(e) =>
                onChangeReservation(e.target.name, e.target.value)
              }
            />
          </div>

          <div className="form-div">
            <label htmlFor="address">Adresse</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="12 rue des jonquilles"
              onChange={(e) =>
                onChangeReservation(e.target.name, e.target.value)
              }
            />
          </div>

          <DatePickter
            disableDate={disableDate}
            setSelectedDates={setSelectedDates}
          />

          <input
            className={isLoading ? "loading" : ""}
            type="submit"
            value={isLoading ? "Création de la réservation" : "Ajouter"}
          />
        </form>
      </div>
    </div>
  );
};

export default AddBookingModal;
