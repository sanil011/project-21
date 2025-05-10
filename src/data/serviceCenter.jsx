import { Campaign, Info, MenuBook, Settings, StickyNote2, SupportAgent } from "@mui/icons-material"

const serviceCenter = [
  {
    id: 1,
    title: "Settings",
    icon: <Settings fontSize="large" sx={{ color: "#61a9ff"}}/>,
    url: "/settings",
  },
  {
    id: 2,
    title: "Feedback",
    icon: <StickyNote2 fontSize="large" sx={{ color: "#61a9ff"}} />,
    url: "/feedback",
  },
  {
    id: 3,
    title: "Notification",
    icon: <Campaign fontSize="large" sx={{ color: "#61a9ff"}} />,
    url: "/notification",
  },
  {
    id: 4,
    title: "Customer Service",
    icon: <SupportAgent fontSize="large" sx={{ color: "#61a9ff"}} />,
    url: "/customer-service",
  },
  {
    id: 5,
    title: "Beginner's Guide",
    icon: <MenuBook fontSize="large" sx={{ color: "#61a9ff"}} />,
    url: "/beginner-guide",
  },
  {
    id: 6,
    title: "About Us",
    icon: <Info fontSize="large" sx={{ color: "#61a9ff"}} />,
    url: "/about-us",
  },
];

export default serviceCenter