import { Reservation } from "../../schema";
import RowBookingTable from "../rowBookingTable/RowBookingTable";
import "./style.scss";

type Props = {
  booking: Reservation[] | [];
};

const BookingTable = ({ booking }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Date de début</th>
          <th scope="col">Date de fin</th>
          <th scope="col">Prénom</th>
          <th scope="col">Nom</th>
          <th scope="col">Adresse</th>
          <th scope="col">Ville</th>
          <th scope="col">Téléphone</th>
          <th scope="col">Matériel</th>
          <th scope="col">Nombre de jour</th>
          <th scope="col">Total</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {booking.length > 0 ? (
          booking.map((item) => (
            <RowBookingTable booking={item} key={item.id} />
          ))
        ) : (
          <tr>
            <td> Aucun résultat</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BookingTable;
