// components/BalancePoller.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../../../store/userData"; // Adjust this path to match your setup
import api from "../../../services/api";
const BalancePoller = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, name } = useSelector((state) => state.userData); // use `name` as userId

  useEffect(() => {
    if (!isAuthenticated || !name) return;

    const fetchBalance = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("lucky-game-user"));
        const jwt = storedUser?.jwt;

        if (!jwt) {
          console.warn("No JWT found in localStorage.");
          return;
        }

        const response = await api.get(`/gamma/lucky9/getBalance?userId=${name}`)
        if (response.status !== 200) throw new Error("Failed to fetch balance");

        const data = response.data;
        if (data?.balance !== undefined) {
          dispatch(userDataActions.updateBalance(data.balance));
        }
      } catch (error) {
        console.error("Balance fetch error: sanil", error);
      }
    };

    fetchBalance(); // immediate fetch
    const interval = setInterval(fetchBalance, 5000); // poll every 2s

    return () => clearInterval(interval); // cleanup on unmount
  }, [isAuthenticated, name, dispatch]);

  return null;
};

export default BalancePoller;