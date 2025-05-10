import { useNavigation } from "react-router-dom";

const GlobalLoader = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return isLoading ? (
    <div className="global-loader">
      <div className="circle-loader">
        <div className="inner-circle" />
        <div className="tip-circle" />
      </div>
      <span className="loader-text">
        Loading<span className="dots" />
      </span>
    </div>
  ) : null;
};


