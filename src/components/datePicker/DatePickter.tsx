import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { eachDayOfInterval, format } from "date-fns";

import "./style.scss";

type Props = {
  setBookingDate: React.Dispatch<React.SetStateAction<string[] | []>>;
  disableDate: string[] | [];
};

const DatePicker = ({ setBookingDate, disableDate }: Props) => {
  const [dateSelected, setDateSelected] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateChange = (ranges: any) => {
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    const datesBetween = eachDayOfInterval({ start: startDate, end: endDate });
    const arrayOfDate = datesBetween.map((date) => format(date, "dd/MM/yyyy"));
    setBookingDate(arrayOfDate);

    setDateSelected([
      {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
      },
    ]);
  };

  const test = disableDate.map((dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  });

  return (
    <div className="datePicker-container">
      <DateRangePicker
        onChange={(e) => handleDateChange(e)}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={dateSelected}
        disabledDates={test}
        minDate={new Date()}
        direction="horizontal"
        staticRanges={[]}
        inputRanges={[]}
      />
    </div>
  );
};

export default DatePicker;
