import {
  Campaign,
  Download,
  Info,
  Language,
  MenuBook,
  SupportAgent,
} from "@mui/icons-material";

const bottomNavigation = [
  {
    id: 1,
    icon: <Language sx={{ color: "#61a9ff" ,fontSize: 30}} />,
    title: "Language",
    url: "/language",
    showDivider: true,
  },
  {
    id: 2,
    icon: <Campaign sx={{ color: "#61a9ff" ,fontSize: 30}} />,
    title: "Notification",
    url: "/notification",
    showDivider: true,
  },
  {
    id: 3,
    icon: <SupportAgent sx={{ color: "#61a9ff" ,fontSize: 30}} />,
    title: "24/7 Customer Service",
    url: "/customer-service",
    showDivider: true,
  },
  {
    id: 4,
    icon: <MenuBook sx={{ color: "#61a9ff" ,fontSize: 30}} />,
    title: "Beginner's Guide",
    url: "/beginner-guide",
    showDivider: true,
  },
  {
    id: 5,
    icon: <Info sx={{ color: "#61a9ff" ,fontSize: 30}}/>,
    title: "About Us",
    url: "/about-us",
    showDivider: true,
  },
  {
    id: 6,
    icon: <Download sx={{ color: "#61a9ff" ,fontSize: 30}} />,
    title: "Download APP",
    url: "/download",
    showDivider: false,
  },
];

export default bottomNavigation;
