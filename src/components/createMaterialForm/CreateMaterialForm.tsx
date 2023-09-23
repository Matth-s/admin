import React, { useState } from "react";
import { Material, FileImport } from "../../schema";
import { v4 as uuidv4 } from "uuid";
import { checkIsEmpty } from "../../helpers/checkFieldForm";
import { postMaterial } from "../../services/firebaseRequest";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { scrollTop } from "../../hooks/topPage";
import { useInputChange } from "../../hooks/form";
import DropZone from "../dropzone/DropZone";
import ErrorInput from "../errorInput/ErrorInput";

import "./style.scss";

const initialFormData: Material = {
  downPayment: 0,
  category: "outil",
  date: "" || null,
  description: "",
  id: uuidv4(),
  presentationPicture: "",
  pictureArray: [],
  name: "",
  pricePerDay: 0,
  disponibility: true,
  visible: true,
  bookingDate: [],
};

const CreateMaterialForm = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const { formData, setFormData, handleInputChange } =
    useInputChange(initialFormData);

  const [errorName, setErrorName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [importedFiles, setImportedFiles] = useState<FileImport[] | []>([]);
  const [imagePresentation, setImagePresentation] = useState<FileImport>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorName("");

    if (checkIsEmpty(formData.name) !== "") {
      setIsLoading(false);
      scrollTop();
      return setErrorName(checkIsEmpty(formData.name));
    }

    await dispatch(
      postMaterial({
        material: formData,
        token,
        importedFiles,
        imagePresentation,
      })
    )
      .unwrap()
      .then((status) => {
        if (status === 201) {
          navigate(`/view-material/${formData.id}`);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Nom */}
        <div className="form-div">
          {errorName && <ErrorInput errorText={errorName} />}
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => handleInputChange(e)}
            value={formData.name}
          />
        </div>

        {/* Description */}
        <div className="form-div">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            onChange={(e) => handleInputChange(e)}
            value={formData.description}
          ></textarea>
        </div>

        {/* Sélection de disponibilité */}
        <div className="form-div">
          <label htmlFor="disponibilite">Disponibilité</label>
          <select
            name="disponibility"
            id="disponibilite"
            onChange={(e) => handleInputChange(e)}
            value={formData.disponibility.toString()}
          >
            <option value="true">Disponible</option>
            <option value="false">Indisponible</option>
          </select>
        </div>

        {!formData.disponibility && (
          <div className="form-div">
            <label htmlFor="date">Jusqu'au</label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={(e) => handleInputChange(e)}
              value={formData.date ? formData.date : ""}
            />
          </div>
        )}

        {/* Acompte */}
        <div className="form-div">
          <label htmlFor="acompte">Acompte</label>
          <input
            type="number"
            name="downPayment"
            id="acompte"
            onChange={(e) => handleInputChange(e)}
            value={formData.downPayment}
          />
        </div>

        {/* Prix */}
        <div className="form-div">
          <label htmlFor="prix">Prix</label>
          <input
            type="number"
            name="pricePerDay"
            id="prix"
            onChange={(e) => handleInputChange(e)}
            value={formData.pricePerDay}
          />
        </div>

        {/* Catégorie */}
        <div className="form-div">
          <label htmlFor="categorie">Catégorie</label>
          <select
            name="category"
            id="categorie"
            onChange={(e) => handleInputChange(e)}
            value={formData.category}
          >
            <option value="outil">Outil</option>
            <option value="vehicule">Véhicule</option>
          </select>
        </div>

        <DropZone
          importedFiles={importedFiles}
          setImportedFiles={setImportedFiles}
          setImagePresentation={setImagePresentation}
          imagePresentation={imagePresentation}
        />

        {/* visible */}
        <div className="checkbox-div">
          <label htmlFor="visible">Mettre en ligne</label>
          <input
            type="checkbox"
            name="visible"
            id="visible"
            onChange={(e) => handleInputChange(e)}
            defaultChecked={formData.visible}
          />
        </div>

        {/* Bouton de soumission */}
        <input
          className={`${isLoading ? "loading" : ""}`}
          type="submit"
          value={isLoading ? "En cours ..." : "Créer le matériel"}
        />
      </form>
    </div>
  );
};

export default CreateMaterialForm;
