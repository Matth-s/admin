import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { eachDayOfInterval, format } from "date-fns";

import "./style.scss";

type Props = {
  setSelectedDates: React.Dispatch<React.SetStateAction<string[] | []>>;
  disableDate: string[] | [];
};

const DatePicker = ({ setSelectedDates, disableDate }: Props) => {
  const [dateSelected, setDateSelected] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  const handleDateChange = (ranges: any) => {
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    const datesBetween = eachDayOfInterval({ start: startDate, end: endDate });
    const arrayOfDate = datesBetween.map((date) => format(date, "dd/MM/yyyy"));
    setSelectedDates(arrayOfDate);

    setDateSelected([
      {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
      },
    ]);
  };

  const test = disableDate.map((dateString) => {
    const [day, month, year] = dateString.split("/").map(Number); // Divise la chaîne en jour, mois et année
    return new Date(year, month - 1, day); // Soustrait 1 du mois car les mois sont 0-indexés en JavaScript
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
