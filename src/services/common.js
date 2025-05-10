import tokenServices from "./token-services";
import api from "./api";

export const fetchUserBalance = async () => {
    const userId = tokenServices.getUserName();
    let res = await api
        .get(`${"/gamma/lucky9/getBalance?userId=" + userId}`)
        .then((res) => res.data);
    return res.balance;
};