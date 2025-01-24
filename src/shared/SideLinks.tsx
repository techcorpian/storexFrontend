import { NavLink, Link, useLocation } from 'react-router-dom';
import Profile from '../assets/profile-pic.png'
import { FiPlus } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
// @ts-ignore
import { User } from '../dummy_datas/User';
// @ts-ignore
import { SideNavlink as EnglishNavlink } from '../lang/en/MenuTitleDatas.jsx';
// @ts-ignore
import { SideNavlink as TamilNavlink } from '../lang/tam/MenuTitleDatas.jsx';
// @ts-ignore
import { SideExtlink as EnglishExtlink } from '../lang/en/MenuTitleDatas.jsx';
// @ts-ignore
import { SideExtlink as TamilExtlink } from '../lang/tam/MenuTitleDatas.jsx';
import './SideLinks.css';


// Define types for Navlink and Extlink
interface Navlink {
  link: string;
  add_link: string;
  icon: JSX.Element;
  title: string;
}

interface Extlink {
  link: string;
  icon: JSX.Element;
  title: string;
}

interface SideLinksProps {
  handleLogout: () => void;
}

let SideNavlink: Navlink[];
let SideExtlink: Extlink[];

if (User.lang_id == 1) {
  SideNavlink = EnglishNavlink;
  SideExtlink = EnglishExtlink;
} else if (User.lang_id == 2) {
  SideNavlink = TamilNavlink;
  SideExtlink = TamilExtlink;
} else {
  SideNavlink = [];
  SideExtlink = [];
}

const SideLinks: React.FC<SideLinksProps> = ({handleLogout}) => {



  const location = useLocation();
  return (
    <ul className="side-links">
    <div className="profile-card">
      <img src={Profile} className='profile_picture' height={60} width={60}/><span>mushthaq <div className='text-sky-300 font-extralight'>Super Admin</div></span>
    </div>
    
    <div className="nav-bar">
    {
    SideNavlink.map((nav) => {
      return(
        <li>
          <NavLink className={`flex justify-between items-center ${location.pathname === nav.add_link ? 'active' : ''}`} to={`${nav.link}`}>
            <div className="flex items-center">
              {nav.icon}
              <span className='ml-2'>{nav.title}</span>
            </div>
            <div className="text-right">
              <Link to={`${nav.add_link}`} className='relative hover:text-sky-400 text-lg'>
                <FiPlus />
              </Link>
            </div>
          </NavLink>
        </li>
        )
      })}

        {/* <li>
          <NavLink className="flex justify-between" to="/vendors">Vendors 
            <div class="text-right">
              <Link to='/add-vendors' className='relative hover:text-green-600 text-lg'>
                <FiPlus />
              </Link>
            </div>
          </NavLink>
        </li> */}

      </div>

      <div className="ext-bar">
    {
    SideExtlink.map((nav) => {
      return(
        <li>
          <NavLink className="flex justify-between items-center" to={`${nav.link}`}>
            <div className="flex items-center">
              {nav.icon}
              <span className='ml-2'>{nav.title}</span>
            </div>
            {/* <div className="text-right">
              <Link to={`${nav.add_link}`} className='relative hover:text-sky-400 text-lg'>
                <FiPlus />
              </Link>
            </div> */}
          </NavLink>
        </li>
        )
      })}
      <div className='pt-[100px] px-3'>
        <Link to='#' className="flex justify-between items-center bg-yellow-600 p-2 rounded-lg" onClick={handleLogout}><div className="flex items-center"><CiLogout /><span className='ml-2'>Logout</span></div></Link>
      </div>
      </div>

    </ul>
  )
}

export default SideLinks