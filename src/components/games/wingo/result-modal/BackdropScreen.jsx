import React from "react";

const BackdropScreen = ({ onClick = () => {}, zIndex = 999, styles = {} }) => {
  return (
    <div
      onClick={onClick}
      className="fixed h-full w-full max-w-[500px] top-0 left-1/2 -translate-x-1/2  bg-[rgb(0,0,0,0.5)] "
      style={{ ...styles, zIndex: zIndex }}
    />
  );
};

export default BackdropScreen;
