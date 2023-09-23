import { useAppDispatch } from "../../store/hooks";
import { signIn } from "../../services/firebaseRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const ConnectionForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await dispatch(signIn(user))
      .unwrap()
      .then((res) => {
        if (res.status === 201) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/wrong-password":
            return setError("Email ou mot de passe invalide");

          case "auth/invalid-email":
            return setError("Email ou mot de passe invalide");
        }
      })
      .finally(() => setIsLoading(false));
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

      <input
        className={`${isLoading ? "loading" : ""}`}
        type="submit"
        value="Se connecter"
      />

      {error !== "" && <p>{error}</p>}
    </form>
  );
};

export default ConnectionForm;
