import { Book, Description, Receipt, Wallet } from "@mui/icons-material";

const histories = [
  {
    id: 1,
    title: "Game History",
    description: "My game history",
    url: "/game-history",
    icon: <Receipt sx={{ color: "#61a9ff" }} fontSize="large" />,
  },
  {
    id: 2,
    title: "Transaction",
    description: "My transaction history",
    url: "/transaction-history",
    icon: <Description color="success" fontSize="large" />,
  },
  {
    id: 3,
    title: "Deposit",
    description: "My deposit history",
    url: "/deposit-history",
    icon: <Book color="error" fontSize="large" />,
  },
  {
    id: 4,
    title: "Withdraw",
    description: "My withdraw history",
    url: "/withdraw-history",
    icon: <Wallet fontSize="large" sx={{color: "orange"}} />,
  },
];

export default histories;
