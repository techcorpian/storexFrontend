import { RiDashboard2Fill } from "react-icons/ri";
import { MdOutlineInventory } from "react-icons/md";

// Define types for the submenu and the main navlink
interface SubMenu {
    title: string;
    link: string;
}

interface TopNavLink {
    id: number;
    title: string;
    link: string;
    icon: JSX.Element;
    subMenu?: SubMenu[]; // Optional subMenu
}

// Define the TopNavlink array with the appropriate type
export const TopNavlink: TopNavLink[] = [
    {
        id: 1,
        title: "Dashboard",
        link: "/",
        icon: <RiDashboard2Fill />,
    },
    {
        id: 2,
        title: "Projects",
        link: "projects",
        subMenu: [
            { title: "Projects", link: "projects" },
            { title: "Sub Home 2", link: "/sub-home-2" },
        ],
        icon: <MdOutlineInventory />,
    },
];
