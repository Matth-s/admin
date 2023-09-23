import { useMemo } from "react";
import { useAppSelector } from "../../store/hooks";
import { setSearchBooking, setFilterBooking } from "../../store/bookingSlice";

import Header from "../../components/header/Header";
import BookingTable from "../../components/bookingTable/BookingTable";
import SearchBar from "../../components/searchBar/SearchBar";
import FilterSelect from "../../components/filterSelect/FilterSelect";

import "./style.scss";

type Props = {
  isLoadingBooking: boolean;
};

const Booking = ({ isLoadingBooking }: Props) => {
  const { booking, searchBooking, filterBooking } = useAppSelector(
    (state) => state.booking
  );

  const bookingMemo = useMemo(() => {
    return booking.filter((book) => {
      const filterValue = searchBooking.toLowerCase();
      if (filterBooking === "email") {
        return book.email.toLowerCase().startsWith(filterValue);
      } else if (filterBooking === "phone") {
        return book.phone
          .replaceAll(" ", "")
          .startsWith(filterValue.replaceAll(" ", ""));
      } else if (filterBooking === "city") {
        return book.city.toLowerCase().startsWith(filterValue);
      } else if (filterBooking === "address") {
        return book.address.toLowerCase().startsWith(filterValue);
      } else if (filterBooking === "firstName") {
        return book.firstName.toLowerCase().startsWith(filterValue);
      } else if (filterBooking === "lastName") {
        return book.lastName.toLowerCase().startsWith(filterValue);
      } else if (filterBooking === "completed") {
        return book.isCompleted === true;
      } else if (filterBooking === "onHold") {
        return book.isCompleted === false;
      } else if (filterBooking === "materialName") {
        return book.materialName.toLowerCase().startsWith(filterValue);
      } else if (filterBooking === "") {
        return book;
      }

      return false;
    });
  }, [booking, searchBooking, filterBooking]);

  return (
    <div className="booking-container">
      <Header />

      {isLoadingBooking ? (
        <p>chargement des données</p>
      ) : (
        <>
          <div className="searchBar-booking flex flex__alignCenter">
            <SearchBar
              setSearch={setSearchBooking}
              searchText={searchBooking}
            />
            <h4>Filtrer par : </h4>
            <FilterSelect value={filterBooking} setValue={setFilterBooking} />
          </div>
          <BookingTable booking={bookingMemo} />
        </>
      )}
    </div>
  );
};

export default Booking;
