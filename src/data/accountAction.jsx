import { AccountBalance, CreditCard, Wallet } from "@mui/icons-material";

const accountActions = [
  {id: 1, name: "Deposit",url: "/deposit", icon: <Wallet fontSize="large" sx={{color: "orange"}} />},
  {id: 2, name: "Withdraw",url: "/withdraw", icon: <CreditCard fontSize="large" sx={{ color: "#61a9ff" }} />},
  {id: 3, name: "Add Bank",url: "/add-bank-account", icon: <AccountBalance fontSize="large" color="success" />}
]

export default accountActions;