import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getMaterialById } from "../../services/firebaseRequest";
import { useLocation, useNavigate } from "react-router-dom";

import BackButton from "../../components/backButton/BackButton";
import EditMaterialForm from "../../components/editMaterialForm/EditMaterialForm";

import "./style.scss";

const EditMaterial = () => {
  const dispatch = useAppDispatch();
  const { viewMaterial } = useAppSelector((state) => state.data);
  const [isLoading, setIsLoading] = useState<boolean>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const request = async (id: string) => {
    await dispatch(getMaterialById(id))
      .unwrap()
      .then()
      .catch(() => navigate("/"))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (viewMaterial.name === "") {
      setIsLoading(true);
      const newPath = pathname
        .replace("/view-material/", "")
        .replace("/edit", "");
      request(newPath);
    } else {
      setIsLoading(false);
    }
  }, [viewMaterial.name]);

  return (
    <div className="editMaterial-container">
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <section>
          <BackButton />
          <EditMaterialForm material={viewMaterial} />
        </section>
      )}
    </div>
  );
};

export default EditMaterial;
