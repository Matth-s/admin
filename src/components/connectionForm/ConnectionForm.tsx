import { useAppDispatch } from "../../store/hooks";
import { signIn } from "../../services/firebaseRequest";
import "./style.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConnectionForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(signIn(user))
        .unwrap()
        .then((res) => {
          if (res?.status === 201) {
            navigate("/");
          }
        })
        .catch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-div">
        <label htmlFor="user">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) =>
            setUser((prevData) => {
              return {
                ...prevData,
                email: e.target.value,
              };
            })
          }
        />
      </div>

      <div className="form-div">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) =>
            setUser((prevData) => {
              return {
                ...prevData,
                password: e.target.value,
              };
            })
          }
        />
      </div>

      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default ConnectionForm;
