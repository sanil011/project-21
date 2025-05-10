import { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import AviatorLoading from "../loadingScreen/AviatorLoading";
// import ResponseFile from "../../../common/aviator/ResponseFile";
import api from "../../../../services/api";
import "./UnityGame.css";
import PropTypes from 'prop-types'

export default function UnityGame({
  isPlaneCrashed,
  setIsPlaneCrashed,
  setLerp,
  setAllBets,
  musicEnabled
}) {
  const { unityProvider, sendMessage, isLoaded, loadingProgression } =
    useUnityContext({
      loaderUrl: "/aviator/Build//aviator.loader.js",
      dataUrl: "/aviator/Build//aviator.data.br",
      frameworkUrl: "/aviator/Build//aviator.framework.js.br",
      codeUrl: "/aviator/Build//aviator.wasm.br",
    });

  const unityCanvasRef = useRef(null);
  const [inputValue, setInputValue] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const previousTargetMultiplier = useRef(1);
  const inputValueRef = useRef(inputValue);
  const [displayProgress, setDisplayProgress] = useState(0);

  const sendToUnity = (value) => {
    if (isLoaded) {
      sendMessage("GameManager", "multiplier", value);
    } else {
      console.log("Unity is not loaded yet. Skipping sendMessage.");
    }
  };

  const startTransition = (newTargetMultiplier) => {
    if (
      newTargetMultiplier === previousTargetMultiplier.current ||
      isPlaneCrashed
    ) {
      return;
    }

    setIsTransitioning(true);
    const startValue = inputValueRef.current;
    const startTime = Date.now();
    const transitionDuration = 1000;

    const animateTransition = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / transitionDuration, 1);

      let lerpedValue =
        startValue + (newTargetMultiplier - startValue) * progress;

      lerpedValue = Math.round(lerpedValue * 100) / 100;

      setInputValue(lerpedValue);
      inputValueRef.current = lerpedValue;

      sendToUnity(lerpedValue);
      setLerp(lerpedValue);

      if (progress < 1) {
        requestAnimationFrame(animateTransition);
      } else {
        setIsTransitioning(false);
        previousTargetMultiplier.current = newTargetMultiplier;
      }
    };

    animateTransition();
  };

  const fetchData = async () => {
    try {
      const { jwt } = JSON.parse(localStorage.getItem("lucky-game-user"));

      // console.log("accessToken"+  jwt);
      const response = await api.get("/api/v1/virtual-games/aviatorGame?gameName=aviator")
      
      const data =  response.data;
      const newMultiplier = data["multiplierRange"];

      const crashState = !data["bettingStatus"];

      const gameId = data["gameId"];
      localStorage.setItem("gameId", gameId);
      console.log("Game ID :", gameId);

      setIsPlaneCrashed(crashState);

      if (data.bets && Array.isArray(data.bets)) {
        setAllBets(data.bets);
        // console.log('setAllBets :', data.bets);
      }

      if (crashState && newMultiplier !== previousTargetMultiplier.current) {
        startTransition(newMultiplier);
      }

      if (!crashState) {
        setInputValue(1);
        inputValueRef.current = 1;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      const intervalId = setInterval(() => {
        fetchData();
      }, 1000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timer);
      };
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      sendMessage(
        "GameManager",
        "crashingPlane",
        isPlaneCrashed ? "true" : "false"
      );
    }
  }, [isPlaneCrashed, isLoaded]);

  useEffect(() => {
    return () => {
      if (isLoaded) {
        sendMessage("GameManager", "quitGame");
      }
    };
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      sendMessage(
        "GameManager",       // GameObject name in Unity
        "soundBtn",          // Unity method to call
        musicEnabled ? "true" : "false"  // Pass "true" or "false" as string
      );

      console.log("clicked" + musicEnabled);
    }
  }, [musicEnabled, isLoaded]);
  

  useEffect(() => {
    const targetProgress = Math.round(loadingProgression * 100);
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= targetProgress) {
          clearInterval(interval);
          return targetProgress;
        }
        return prev + 1;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [loadingProgression]);

  return (
    <div className="unity-container">
      {isLoading && (
        <div>
          <AviatorLoading progress={displayProgress} />
        </div>
      )}

      <Unity
        unityProvider={unityProvider}
        canvasRef={unityCanvasRef}
        devicePixelRatio={window.devicePixelRatio}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          imageRendering: "crisp-edges",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

UnityGame.propTypes = {
  isPlaneCrashed: PropTypes.bool.isRequired,
  setIsPlaneCrashed: PropTypes.func.isRequired,
  setLerp: PropTypes.func.isRequired,
};
