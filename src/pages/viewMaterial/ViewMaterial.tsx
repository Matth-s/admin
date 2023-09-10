import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMaterialById } from "../../services/firebaseRequest";

import Header from "../../components/header/Header";
import Carrousel from "../../components/carroussel/Carroussel";
import Loader from "../../components/loader/Loader";
import Delete from "../../components/deleteButton/Delete";
import DeleteModal from "../../components/modalDelete/DeleteModal";
import CardDescription from "../../components/cardDescription/CardDescription";
import EditMaterial from "../../components/editMaterial/EditMaterial";

import "./style.scss";
import BackButton from "../../components/backButton/BackButton";

const ViewMaterial = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { viewMaterial } = useAppSelector((state) => state.data);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    if (viewMaterial.id === "" && id) {
      setIsLoading(true);
      const fetch = async () => {
        await dispatch(getMaterialById(id))
          .unwrap()
          .then((status) => {
            if (status !== 200) {
              return navigate("/");
            }
          })
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false));
      };

      fetch();
    }

    setIsLoading(false);
  }, []);

  const material = (
    <div className="material-container flex">
      <div>
        <Carrousel
          imageArray={viewMaterial.pictureArray}
          imagePresentation={viewMaterial.presentationPicture}
        />
      </div>

      <CardDescription
        name={viewMaterial.name}
        description={viewMaterial.description}
        date={viewMaterial.date}
        disponibility={viewMaterial.disponibility}
        pricePerDay={viewMaterial.pricePerDay}
        downPayment={viewMaterial.downPayment}
      />
    </div>
  );

  const editMaterial = (
    <div className="flex flex__alignCenter flex__spaceAround">
      <EditMaterial setIsEditing={setIsEditing} material={viewMaterial} />
    </div>
  );

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <section className="viewMaterial-container">
          <BackButton />

          {openDeleteModal && (
            <DeleteModal
              name={viewMaterial.name}
              setOpenDeleteModal={setOpenDeleteModal}
              id={viewMaterial.id}
            />
          )}
          <h2>{viewMaterial.name}</h2>

          <div className="flex button-div">
            <button onClick={() => setIsEditing((prev) => !prev)}>
              {isEditing ? "Annuler" : "Editer"}
            </button>
            <Delete setOpenDeleteModal={setOpenDeleteModal} />
          </div>

          {isEditing ? editMaterial : material}
        </section>
      )}
    </div>
  );
};

export default ViewMaterial;
