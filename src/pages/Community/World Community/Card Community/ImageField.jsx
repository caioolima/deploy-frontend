import { t } from "i18next";
import "./styles.css";
import { useNavigate } from "react-router-dom";
export default function Articles() {
  const navigate = useNavigate();
  return (
    <section className="container-overflow">
      <div className="images-field-top">
        <div className="cardContainerImageField">
          <div className="imagefieldContainer a1">
            <div className="textContainer">
              <span>{t("bestPlaces")}</span>
              <span>{t("toGoBackpacking")}</span>
            </div>
            <div className="black-block">
              <p>{t("discover")}</p>
              <button
                className="button-article"
                onClick={() => navigate("/backpacking-article")}
              >
                {t("seeNow")}
              </button>
            </div>
          </div>
        </div>
        <div className="cardContainerImageField">
          <div className="imagefieldContainer a2">
            <div className="textContainer">
              <span className="text-top-intro">{t("introduction")}</span>
              <span>
                {t("toTheLife")}
                {t("continuosLife")}
              </span>

              <span>{t("ofABackpacker")}</span>
            </div>
            <div className="black-block">
              <p>{t("comeAndDiscover")}</p>
              <button className="button-article" onClick={() => navigate("/backpacking-introduction")}>{t("seeNow")}</button>
            </div>
          </div>
        </div>
        <div className="cardContainerImageField">
          <div className="imagefieldContainer a3">
            <div className="textContainer">
              <span>{t("discoverTheBest")}</span>
            </div>
            <div className="black-block">
              <p>{t("discoverTheBestWays")}</p>
              <button className="button-article" onClick={() => navigate("/perfect-photos")}>{t("seeNow")}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
