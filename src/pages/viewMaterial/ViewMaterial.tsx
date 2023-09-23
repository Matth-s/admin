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
import BackButton from "../../components/backButton/BackButton";
import AddDateBooking from "../../components/buttonAddDateBooking/AddDateBooking";
import EditButton from "../../components/editingButton/EditButton";
import ModalAddBooking from "../../components/modalAddBooking/AddBookingModal";

import "./style.scss";

const ViewMaterial = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const { viewMaterial } = useAppSelector((state) => state.data);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);

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

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <section className="viewMaterial-container">
          <BackButton />

          {/* Modal */}
          {openDeleteModal && (
            <DeleteModal
              name={viewMaterial.name}
              setOpenDeleteModal={setOpenDeleteModal}
              id={viewMaterial.id}
            />
          )}

          {openBookingModal && (
            <ModalAddBooking
              setOpenBookingModal={setOpenBookingModal}
              disableDate={viewMaterial.bookingDate}
              pricePerDay={viewMaterial.pricePerDay}
              downPayment={viewMaterial.downPayment}
              materialId={viewMaterial.id}
              materialName={viewMaterial.name}
            />
          )}

          <h2>{viewMaterial.name}</h2>

          <div className="flex button-div">
            <AddDateBooking setOpenBookingModal={setOpenBookingModal} />
            <EditButton />
            <Delete setOpenDeleteModal={setOpenDeleteModal} />
          </div>

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
        </section>
      )}
    </div>
  );
};

export default ViewMaterial;
