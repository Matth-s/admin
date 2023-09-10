import "./style.scss";

type Props = {
  description: string;
  date: string | null;
  disponibility: boolean;
  pricePerDay: number;
  downPayment: number;
  name: string;
};

const CardDescription = ({
  description,
  date,
  disponibility,
  pricePerDay,
  downPayment,
  name,
}: Props) => {
  return (
    <div className="cardDescription-container">
      <p className="title">{name.toLocaleUpperCase()}</p>
      <p className="description">{description}</p>

      <p className="price">Acompte: {downPayment}€</p>
      <p className="price">Tarif: {pricePerDay}€/jour</p>

      <p className="disponilibility">
        Disponibilitée:{" "}
        {disponibility
          ? "disponible"
          : date
          ? `Disponible à partir du ${date}`
          : "indisponible"}
      </p>
    </div>
  );
};

export default CardDescription;
