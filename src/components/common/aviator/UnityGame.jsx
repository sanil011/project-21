import React, { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import AviatorLoading from "./loadingScreen/AviatorLoading";
import ResponseFile from "./ResponseFile";
import "./Aviator.css";

export default function UnityGame() {
    const { unityProvider, sendMessage, isLoaded } = useUnityContext({
        loaderUrl: "/aviator/Build//aviator.loader.js",
        dataUrl: "/aviator/Build//aviator.data.br",
        frameworkUrl: "/aviator/Build//aviator.framework.js.br",
        codeUrl: "/aviator/Build//aviator.wasm.br",
      });

      const unityCanvasRef = useRef(null);
      const [inputValue, setInputValue] = useState(0); // Current multiplier value
      const [isTransitioning, setIsTransitioning] = useState(false); // Transition state
      const [isPlaneCrashed, setIsPlaneCrashed] = useState(false); // To toggle crashing state
      const [isLoading, setIsLoading] = useState(true); // New loading state
      const previousTargetMultiplier = useRef(1); // Track previous target multiplier
      const inputValueRef = useRef(inputValue); // Track the latest inputValue (to avoid reset)

      // Function to send the current value to Unity if Unity is loaded
      const sendToUnity = (value) => {
        if (isLoaded) {
          sendMessage("GameManager", "multiplier", value);
        } else {
          console.log("Unity is not loaded yet. Skipping sendMessage.");
        }
      };

      // Function to handle lerp transition to the new target multiplier
      const startTransition = (newTargetMultiplier) => {
        if (newTargetMultiplier === previousTargetMultiplier.current || isPlaneCrashed) {
          return; // Don't start a new transition if the target hasn't changed or plane is crashed
        }

        setIsTransitioning(true); // Mark transition as in progress
        const startValue = inputValueRef.current; // Use ref to avoid reset on re-render
        const startTime = Date.now();
        const transitionDuration = 1000; // Transition duration in ms (1 second)

        const animateTransition = () => {
          const elapsedTime = Date.now() - startTime;
          const progress = Math.min(elapsedTime / transitionDuration, 1); // Progress from 0 to 1

          // Calculate the lerped value (interpolated between start and target)
          let lerpedValue = startValue + (newTargetMultiplier - startValue) * progress;

          // Round the lerped value to 2 decimal places
          lerpedValue = Math.round(lerpedValue * 100) / 100;

          setInputValue(lerpedValue);  // Update state with lerped value
          inputValueRef.current = lerpedValue; // Update the ref with the latest value

          // Send the lerped value to Unity
          sendToUnity(lerpedValue);

          // Continue animating if not yet finished
          if (progress < 1) {
            requestAnimationFrame(animateTransition); // Continue the animation
          } else {
            setIsTransitioning(false); // Transition is complete
            previousTargetMultiplier.current = newTargetMultiplier; // Update the ref
          }
        };

        animateTransition(); // Start the animation
      };

      // Function to fetch data (multiplier and crash state) from the backend API
      const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("refreshToken");
      const response = await fetch("https://play-247.in/games/api/v1/virtual-games/aviatorGame", {
        method: "GET", // HTTP method (GET in this case)
        headers: {
            "Authorization": `Bearer ${accessToken}`, // Add JWT token as Bearer token
            "Content-Type": "application/json" // Optional: if your API expects JSON format
        }
      });
      const data = await response.json();
          const newMultiplier = data["multiplierRange"]; // the API returns a "next target" field

          // Simulating a boolean crash value from the API
          const crashState = data["isAlive"]; // set true or false

          setIsPlaneCrashed(crashState); // Set the new crash state

          // If the plane is not crashed, we start transitioning to the new multiplier
          if (crashState && newMultiplier !== previousTargetMultiplier.current) {
            startTransition(newMultiplier); // Start transitioning if the new multiplier is different
          }

          // If the plane is crashed, reset multiplier to 1
          if (!crashState) {
            setInputValue(1); // Reset multiplier to 1
            inputValueRef.current = 1; // Update the ref to match the reset value
          }

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      // Set an interval to fetch the new target multiplier and crash state every second
      useEffect(() => {
        if (isLoaded) {
          const timer = setTimeout(() => {
            setIsLoading(false);
          }, 2500); // 5000 ms = 5 seconds
          const intervalId = setInterval(() => {
            fetchData(); // Fetch the new data (multiplier and crash state)
          }, 1000); // 1000 ms = 1 second

          // Cleanup the interval when the component unmounts
          return () =>{
            clearInterval(intervalId);
            clearTimeout(timer);
          }

        }
      }, [isLoaded]); // Wait for Unity to load before starting the interval

      // Send the current plane crash state to Unity
      useEffect(() => {
        if (isLoaded) {
          sendMessage("GameManager", "crashingPlane", isPlaneCrashed ? "true" : "false"); // Send the crash state as a string
        }
      }, [isPlaneCrashed, isLoaded]); // Send updated crash state to Unity when it changes

          // To Stop the music running in background
      useEffect(() => {
        return () => {
          if (isLoaded){
            sendMessage("GameManager", "quitGame"); // Call Unity function to stop sounds
          }
        };
      }, [isLoaded]);

      return (
        <div className="unity-container">
          {/* Show a white panel with animation while loading */}
          {isLoading && (
            <div>
              <AviatorLoading/>
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
            objectFit: "cover", // Ensures game fills container without distortion
          }}/>

          {/* Display the current multiplier and plane crash state
          <p>Current Multiplier: {inputValue.toFixed(2)}</p>
          <p>Plane Crashed: {isPlaneCrashed ? "Yes" : "No"}</p>  */}
          <ResponseFile/>
        </div>
      );
}
