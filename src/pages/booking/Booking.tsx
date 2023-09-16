import Header from "../../components/header/Header";
import { useAppSelector } from "../../store/hooks";

import "./style.scss";

type Props = {
  isLoadingBooking: boolean;
};

const Booking = ({ isLoadingBooking }: Props) => {
  const { booking } = useAppSelector((state) => state.booking);

  console.log(booking);

  return (
    <div>
      <Header />

      {isLoadingBooking ? (
        <p>chargement des données</p>
      ) : (
        <>
          {booking.length > 0 &&
            booking.map((item) => (
              <div>
                <p>{item.lastName}</p>
                <p>{item.firstName}</p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Booking;
