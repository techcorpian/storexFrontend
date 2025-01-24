import { FaUser } from "react-icons/fa6";
import { BsShopWindow } from "react-icons/bs";

export const TopNavlink = [
    {
        "title":"கட்டுப்பாட்டகம்",
        "link":"/"
    },
    {
        "title":"சரக்கு",
        "link":"/inventory"
    },
    {
        "title":"விற்பனை",
        "link":"/sales"
    },
    {
        "title":"கொள்முதல்",
        "link":"/purchase"
    },
    {
        "title":"அறிக்கைகள்",
        "link":"/reports"
    },
];

export const TopNavSublink = [
    {
        "title":"Dashboard",
        "link":"/"
    },
];

export const SideNavlink = [
    {
        "title":"வாடிக்கையாளர்",
        "link":"/clients",
        "add_link":"/add-clients",
        "icon":<FaUser />
    },
    {
        "title":"விற்பனையாளர்கள்",
        "link":"/vendors",
        "add_link":"/add-vendors",
        "icon":<BsShopWindow />
    },
];

export const SideExtlink = [
    {
        "title":"Integration",
        "link":"/integration",
        "icon":<FaUser />
    },
    {
        "title":"Vendors",
        "link":"/vendors",
        "add_link":"/add-vendors",
        "icon":<BsShopWindow />
    },
];