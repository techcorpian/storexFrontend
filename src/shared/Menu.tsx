import { useState, useEffect, useRef, MouseEvent } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { TopNavlink } from '../datas/MenuData';
import { FaChevronDown } from "react-icons/fa";
// import { CgMenuGridO } from "react-icons/cg";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaBell } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import SideLinks from './SideLinks';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';

// Define the SubMenu type
interface SubMenu {
    title: string;
    link: string;
}

interface NavLinkType {
    id: number;
    title: string;
    link: string;
    icon: JSX.Element;
    subMenu?: SubMenu[];
}

const Menu: React.FC = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
    // const [desktopOpenSubMenu, setDesktopOpenSubMenu] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = (): void => {
        dispatch(logout());
        navigate('/login');
    };

    // const openDrawerHandler = (): void => {
    //     setDrawerIsOpen(true);
    // };

    const closeDrawerHandler = (): void => {
        setDrawerIsOpen(false);
    };

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSubMenu = (index: number): void => {
        if (openSubMenu === index) {
            setOpenSubMenu(null);
        } else {
            setOpenSubMenu(index);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
                setOpenSubMenu(null);
                // setDesktopOpenSubMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
        };
    }, [menuRef]);

    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <SideLinks handleLogout={handleLogout} />
                </nav>
            </SideDrawer>

            <div className="w-[100%] text-black z-10 fixed" ref={menuRef}>
                <div className="flex justify-between items-center py-2 px-3 md:px- md:pr-6">
                    <div className="flex justify-between items-center w-full">
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="text-black focus:outline-none">
                                <HiOutlineMenuAlt3 className='text-xl' />
                            </button>
                        </div>
                        <div className='flex justify-center items-center text-2xl text-gray-400 gap-3 z-20'>
                            {/* <button
                                className="main-navigation__menu-btn"
                                onClick={openDrawerHandler}
                            >
                                <CgMenuGridO className="hidden md:block icons hover:text-gray-600" />
                            </button> */}
                            <div className='font-bold text-gray-300 text-2xl'>Storex<span className='text-gray-700 text-2xl'>Cloud.</span></div>
                        </div>

                        <div>
                            <div className='p-2 border border-gray-300 hover:bg-gray-200 hover:border-gray-400 text-black rounded-full cursor-pointer'><FaBell /></div>
                        </div>
                    </div>
                </div>
                <div className={`absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden ${isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}>
                    <div className="rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                        {
                            TopNavlink.map((data: NavLinkType, index: number) => (
                                <div key={index}>
                                    <button
                                        onClick={() => toggleSubMenu(index)}
                                        className={`flex items-center justify-between w-full text-left py-2 px-4 text-black hover:bg-gray-100 ${location.pathname === data.link ? 'bg-gray-200' : ''}`}
                                    >
                                        <span>{data.title}</span>
                                        {data.subMenu && <FaChevronDown className={`ml-2 transition-transform text-xs ${openSubMenu === index ? 'rotate-180' : 'rotate-0'}`} />}
                                    </button>
                                    {openSubMenu === index && data.subMenu && (
                                        <div className="pl-4">
                                            {data.subMenu.map((subData: SubMenu, subIndex: number) => (
                                                <NavLink
                                                    to={subData.link}
                                                    key={subIndex}
                                                    className={`block py-2 px-4 text-black hover:bg-gray-200 ${location.pathname === subData.link ? 'bg-gray-200' : ''}`}
                                                >
                                                    {subData.title}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
