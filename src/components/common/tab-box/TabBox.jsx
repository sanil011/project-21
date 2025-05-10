import PropTypes from "prop-types";
import { tabs } from "../../../data";
import { cn } from "../../../utils/utils";
import "./TabBox.css"; // 👈 Import the CSS

const TabBox = ({ changeTab }) => {
  return (
    <div className="my-4 mx-4 grid grid-cols-6 gap-2">
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          className={cn("tab-box", tab.classes && tab.classes)}
          onClick={() => changeTab(tab.name)}
        >
          <img src={tab.image} alt={tab.name} className="h-16 mb-3 ml-1 z-10" />
          <p className="mb-1 text-sm z-10 absolute bottom-2 right-2 text-white font-semibold">
            {tab.name}
          </p>
          <img
            src={tab.background}
            alt={tab.name}
            className={cn(
              "absolute -top-2 min-h-[125%] h-full object-cover rounded-xl",
              index < 2 ? "min-w-[100%] left-0" : "min-w-[115%] -left-3"
            )}
          />
        </div>
      ))}
    </div>
  );
};

TabBox.propTypes = {
  changeTab: PropTypes.func.isRequired,
};

export default TabBox;
