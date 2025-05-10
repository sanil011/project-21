import { NavLink, useLocation } from "react-router-dom";
import { footer } from "../../../data";
import { useSelector } from "react-redux";
import footerBg from "../../../images/footer-bg.png";
import "./Footer.css";

const Footer = () => {
  const { id } = useSelector((store) => store.userData);
  const location = useLocation();
  const pathname = location.pathname;

  const getOverlayClass = () => {
    if (pathname.includes("virtual-games/aviator")) return "overlay-aviator";
    if (pathname.includes("virtual-games/pushpa")) return "overlay-pushpa";
    if (pathname.includes("virtual-games/dice")) return "overlay-dice";

    return "overlay-default";
  };

  // Determine promotion icon variation based on route
  const getPromotionIconClass = () => {
    if (pathname.includes("virtual-games/aviator")) return "promo-aviator";
    if (pathname.includes("virtual-games/pushpa")) return "promo-pushpa";
    if (pathname.includes("virtual-games/dice")) return "promo-dice";

    return "";
  };

  return (
    <div
      className={`footer-wrapper ${getOverlayClass()}`}
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      {footer.map((tab) => {
        const isPromotion = tab.name === "Promotion";

        return (
          <NavLink
            key={tab.id}
            to={tab.name === "Account" ? `${tab.url}/${id}` : tab.url}
            className={({ isActive }) =>
              `footer-tab ${isActive ? "active" : ""}`
            }
          >
            <div className="footer-icon-wrapper">
              {isPromotion ? (
                <div
                  className={`footer-promotion-icon-wrapper ${getPromotionIconClass()}`}
                >
                  {tab.icon}
                </div>
              ) : (
                <div className="footer-icon-container">
                  <span className="footer-icon-bg" />
                  <span className="footer-icon">{tab.icon}</span>
                </div>
              )}
            </div>
            <div className="footer-tab-label">{tab.name}</div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Footer;
