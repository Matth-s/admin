import { Material } from "../../schema";
import { useNavigate } from "react-router-dom";
import { setViewMaterial } from "../../store/dataSlice";
import { useAppDispatch } from "../../store/hooks";

import "./style.scss";

type Props = {
  dataItem: Material;
};

const CardItem = ({ dataItem }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleViewMaterial = () => {
    navigate(`/view-material/${dataItem.id}`);
    dispatch(setViewMaterial(dataItem));
  };

  return (
    <div className="cardItem-container flex flex__alignCenter flex__spaceAround">
      <div className="image-div">
        {dataItem.presentationPicture ? (
          <img src={dataItem.presentationPicture} alt={dataItem.name} />
        ) : (
          <img src="../assets/empty-image.svg" alt="empty" />
        )}
      </div>

      <section>
        <h2 className="title">{dataItem.name}</h2>
        <p>{dataItem.description}</p>
      </section>

      <button onClick={() => handleViewMaterial()}>Gérer</button>
    </div>
  );
};

export default CardItem;
