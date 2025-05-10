// PromotionLayout.jsx
import { Outlet } from "react-router-dom";

const PromotionLayout = () => {
  return (
    <div>
      {/* Shared Header or Tab bar for Promotion pages */}
      <Outlet />
    </div>
  );
};

export default PromotionLayout;
