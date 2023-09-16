import { deleteMaterialById } from "../../services/firebaseRequest";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./style.scss";

type Props = {
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  id: string;
};

const DeleteModal = ({ setOpenDeleteModal, name, id }: Props) => {
  const { token } = useAppSelector((state) => state.user);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      await dispatch(deleteMaterialById({ id, token }))
        .unwrap()
        .then((res) => {
          if (res === 200) {
            navigate("/");
          }
        });
    } catch (error) {
      setMessage("Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    setOpenDeleteModal(false);
  };

  return (
    <div className="newBoardModal-container">
      <div
        onClick={() => setOpenDeleteModal(false)}
        className="modalBackground"
      ></div>

      <div className="modalContent">
        <h1 className="title">Confirmez-vous la suppression de "{name}" ?</h1>

        <div className="button-div flex">
          <button
            className={`${isLoading ? "loading" : ""}`}
            onClick={() => handleCancel()}
          >
            Annuler
          </button>
          <button
            className={`${isLoading ? "loading" : ""}`}
            onClick={() => handleDelete()}
          >
            Confirmer
          </button>
        </div>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default DeleteModal;
