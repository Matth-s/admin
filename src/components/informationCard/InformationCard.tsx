type Props = {
  downPayment: number;
  date: string | null;
  description: string;
  name: string;
  pricePerDay: number;
  disponibility: boolean;
};

const InformationCard = ({
  description,
  downPayment,
  date,
  pricePerDay,
  disponibility,
}: Props) => {
  return (
    <div>
      <p>{description}</p>
      <p>{downPayment}</p>
      <p>{pricePerDay}</p>
      <p>{disponibility}</p>
      {!disponibility && date ? <p>{date}</p> : <p>non definie</p>}
    </div>
  );
};

export default InformationCard;
