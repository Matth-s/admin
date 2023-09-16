type Props = {
  setOpenBookingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ButtonAddDateBooking = ({ setOpenBookingModal }: Props) => {
  return (
    <button onClick={() => setOpenBookingModal(true)}>
      Ajouter une réservation
    </button>
  );
};

export default ButtonAddDateBooking;
