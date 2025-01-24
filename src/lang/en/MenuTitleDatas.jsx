import { HiUser } from "react-icons/hi2";
import { FaUserTie } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { MdLockPerson } from "react-icons/md";
import { TbShieldLock } from "react-icons/tb";

import { FaShop } from "react-icons/fa6";

import { BsPlugin } from "react-icons/bs";
import { GrAppsRounded } from "react-icons/gr";
import { SlSettings } from "react-icons/sl";

import { IoMdAnalytics } from "react-icons/io";
import { MdOutlineInventory } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";

import { FiBox } from "react-icons/fi";
import { FaSitemap } from "react-icons/fa";
import { LuBoxes } from "react-icons/lu";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { TbAdjustments } from "react-icons/tb";



export const TopNavlink = [
    {
        "id":1,
        "title":"Dashboard",
        "link":"/",
        "icon":<IoMdAnalytics />
    },
    {
        "id":2,
        "title":"Projects",
        "link":"/projects",
        "icon":<MdOutlineInventory />
    }
    // {
    //     "id":3,
    //     "title":"Sales",
    //     "link":"/sales",
    //     "icon":<FaChartLine />
    // },
    // {
    //     "id":4,
    //     "title":"Purchase",
    //     "link":"/purchase",
    //     "icon":<FaShoppingBasket />
    // },
    // {
    //     "id":5,
    //     "title":"Reports",
    //     "link":"/reports",
    //     "icon":<TbReportAnalytics />
    // },
];

export const TopNavSublink = {
    2: [
        {
            
            "title":"Items",
            "link":"/items",
            "add_link":"/users/add",
            "icon":<FiBox />
        },
        {
            
            "title":"Items Groups",
            "link":"/itemgroups",
            "add_link":"/add-itemgroups",
            "icon":<FaSitemap /> 
        },
        {
            
            "title":"Composite Items",
            "link":"/composite_items",
            "add_link":"/add-composite_items",
            "icon":<LuBoxes />
        },
        {
            
            "title":"Price Lists",
            "link":"/price_lists",
            "add_link":"/add-price_lists",
            "icon":<RiMoneyDollarBoxLine />
        },
        {
            
            "title":"Inventory Adjustments",
            "link":"/inv_adjustments",
            "add_link":"/add-inv_adjustments",
            "icon":<TbAdjustments />
        },
    ],

    3: [
        {
            
            "title":"Retainer Invoice",
            "link":"/retainer-invoice",
            "add_link":"/add-retainer-invoice",
            "icon":<FiBox />
        },
        {
            
            "title":"Sales Orders",
            "link":"/sales-orders",
            "add_link":"/add-sales-orders",
            "icon":<FaSitemap /> 
        },
        {
            
            "title":"Packages",
            "link":"/packages",
            "add_link":"/add-packages",
            "icon":<LuBoxes />
        },
        {
            
            "title":"Shipments",
            "link":"/shipments",
            "add_link":"/add-shipments",
            "icon":<RiMoneyDollarBoxLine />
        },
        {
            
            "title":"Delivery Challans",
            "link":"/delivery-challans",
            "add_link":"/add-delivery-challans",
            "icon":<TbAdjustments />
        },
        {
            
            "title":"Invoices",
            "link":"/invoices",
            "add_link":"/add-invoices",
            "icon":<TbAdjustments />
        },
        {
            
            "title":"Payments Recieved",
            "link":"/payments-recieved",
            "add_link":"/add-payments-recieved",
            "icon":<TbAdjustments />
        },
        {
            
            "title":"Sales Returns",
            "link":"/sales-returns",
            "add_link":"",
            "icon":<TbAdjustments />
        },
        {
            
            "title":"Credit Notes",
            "link":"/credit-notes",
            "add_link":"/add-credit-notes",
            "icon":<TbAdjustments />
        },
    ],
};

export const SideNavlink = [
    {
        "title":"Users",
        "link":"/users",
        "add_link":"users/add",
        "icon":<HiUser />
    },
    {
        "title":"User Groups",
        "link":"/usergroups",
        "add_link":"/add-usergroups",
        "icon":<HiUserGroup />
    },
    {
        "title":"Permissions",
        "link":"/permissions",
        "add_link":"/add-permissions",
        "icon":<MdLockPerson />
    },
];

export const SideExtlink = [
    {
        "title":"Settings",
        "link":"/settings",
        "icon":<SlSettings />
    },
    {
        "title":"Integration",
        "link":"/integration",
        "icon":<BsPlugin />
    },
    {
        "title":"Our Applications",
        "link":"/applications",
        "icon":<GrAppsRounded />
    },
];