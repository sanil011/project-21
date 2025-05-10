// Lucide icons
import {
  Home,
  ShoppingBag,
  Wallet,
  CircleUser,
} from "lucide-react";

// MUI icon for Promotion
import { Diamond } from "@mui/icons-material";

const footer = [
  {
    id: 1,
    icon: <Home size={26} />,
    name: "Home",
    url: "/",
  },
  {
    id: 2,
    icon: <ShoppingBag size={26} />,
    name: "Activity",
    url: "/activity",
  },
  {
    id: 3,
    icon: <Diamond style={{ fontSize: 22 }} />,
    name: "Promotion",
    url: "/promotion",
  },
  {
    id: 4,
    icon: <Wallet size={26} />,
    name: "Wallet",
    url: "/wallet",
  },
  {
    id: 5,
    icon: <CircleUser size={26} />,
    name: "Account",
    url: "/account",
  },
];

export default footer;
