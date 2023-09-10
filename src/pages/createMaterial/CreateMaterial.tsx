import CreateMaterialForm from "../../components/createMaterialForm/CreateMaterialForm";
import Header from "../../components/header/Header";
import BackButton from "../../components/backButton/BackButton";

import "./style.scss";

const CreateMaterial = () => {
  return (
    <div className="createMaterial-container">
      <Header />
      <section className="createMaterial-section">
        <BackButton />
        <CreateMaterialForm />
      </section>
    </div>
  );
};

export default CreateMaterial;
