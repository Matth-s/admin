import React, { useState } from "react";

import { FileImport, Material } from "../../schema";
import { useInputChange } from "../../hooks/form";
import { useAppDispatch } from "../../store/hooks";
import { updateMaterialById } from "../../services/firebaseRequest";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

import EditDropZone from "../editDropZone/EditDropZone";

import "./style.scss";

type Props = {
  material: Material;
};

const EditMaterialForm = ({ material }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token } = useAppSelector((state) => state.user);
  const { formData, handleInputChange } = useInputChange(material);

  const [importNewFile, setImportNewFile] = useState<FileImport[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await dispatch(
      updateMaterialById({
        id: formData.id,
        updatedMaterial: formData,
        token,
      })
    )
      .unwrap()
      .then((res) => {
        if (res === 200) {
          navigate(-1);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="editMaterial-form">
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Nom */}
        <div className="form-div">
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

        <div>
          <EditDropZone
            importNewFile={importNewFile}
            setImportNewFile={setImportNewFile}
          />
        </div>

        <input
          className={`${isLoading ? "loading" : ""}`}
          type="submit"
          value="Enregistrer"
        />
      </form>
    </div>
  );
};

export default EditMaterialForm;
