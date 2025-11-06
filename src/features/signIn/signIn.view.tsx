import "./signin.css";
import isotype from "../../assets/logo/isotype-primary.png";
import { Button } from "../../shared/UI/Button/Button";
import { Icon } from "../../shared/UI/Icon/Icon";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import loader from "../../assets/img/security GIF.gif";
import { userStore } from "../../store/user";
import { authUser } from "../../services/authService";
import { DEFAULT_LOGIN_VALUE } from "../../constants/login";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const signInHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget as HTMLFormElement);
    const values = Object.fromEntries(form);
    const email = String(values.email) || DEFAULT_LOGIN_VALUE.EMAIL;
 
    authUser(email);
    const user = userStore.getUser();

    if (user) {
      setShowLoader(true);
      setTimeout(() => {
        navigate({ to: "/gallery" });
      }, 4000);
      return;
    }

    throw Error("Error signing in, retry sign in as guest");
  };

  return (
    <section className="sign-in--view">
      <div className="sign-in--container">
        <img src={isotype} alt="Vaultoria Logo" />
        <h1>{t("login.welcome")}</h1>
        <form className="sign-in--form" onSubmit={signInHandler}>
          <div className="sign-in--form__group">
            <label htmlFor="email">{t("login.emailPlaceholder")}</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t("login.emailPlaceholder")}
              className="sign-in--form__group__email"
            />
          </div>
          <div className="sign-in--form__group">
            <label htmlFor="password">{t("login.passwordPlaceholder")}</label>
            <div className="sign-in--form__group__password">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? "visibilityOff" : "visibility"}
                  color="primary"
                />
              </button>
            </div>
            <div className="sign-in--form__group__remember-me">
              <input type="checkbox" name="remember-me" id="remember-me" />
              <label htmlFor="remember-me">{t("login.rememberMe")}</label>
            </div>
          </div>
          <Button
            type="submit"
            placeholder={t("login.signInButton")}
            size="large"
          />
        </form>
      </div>
      {showLoader && (
        <div className="modal-loader--container">
          <img src={loader} alt="Computer man" />
          <div className="modal-loader--loader">
            <h2>Loading</h2>
            <div className="modal-loader--dots">
              <div className="modal-loader--dots--dot"></div>
              <div className="modal-loader--dots--dot"></div>
              <div className="modal-loader--dots--dot"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
