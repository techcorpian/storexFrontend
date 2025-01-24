import { useState, useEffect } from 'react'
import { BiMemoryCard } from "react-icons/bi";
import { RiDashboard3Line } from "react-icons/ri";
import { IoFolderOutline } from "react-icons/io5";

import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'

export interface Folder {
    _id?: string;
    name: string;
    description: string;
    master_id: number;
}

const MobileMenu = () => {
    const location = useLocation();
    const [folders, setFolders] = useState<Folder[]>([]);
    const api = import.meta.env.VITE_API

    const fetchFolders = async () => {
        const response = await axios.get<Folder[]>(`${api}/api/folder/`);
        console.log(response);
        setFolders(response.data);
    };

    useEffect(() => {
        fetchFolders();
    }, []);

  return (
    <div className='fixed bottom-0 flex w-full text-center text-white p-4 gap-4 bg-neutral-800 md:hidden scroll-y'>
            <div>
                <Link to='/home' className={`flex items-center gap-3 hover:text-black py-1 px-4 rounded-full ${location.pathname === `/home` ? "bg-gray-200 text-black" : ""
                    }`}><span className='text-3xl'><RiDashboard3Line /></span></Link>
            </div>
            <div>
                <div className='text-sm text-gray-400 font-bold px-4'></div>
                <Link to='/mydrive' className='flex items-center gap-3 hover:bg-gray-200 py-1'><span className='text-blue-500 text-3xl'><BiMemoryCard /></span></Link>
            </div>
            <div className='flex'>
                <div className='flex text-sm text-gray-400 font-bold px-4'></div>
                {folders.map((data) =>
                    data.master_id == 0 ? (
                        <Link
                            key={data._id}
                            to={`/folder/${data._id}`}
                            className={`flex items-center gap-3 hover:bg-gray-200 px-4 py-1 rounded-full ${location.pathname === `/folder/${data._id}` ? "bg-gray-200 text-black " : ""
                                } font-light`}
                        >
                            <span className="text-3xl">
                                <IoFolderOutline />
                            </span>
                        </Link>
                    ) : null
                )}
            </div>
    </div>
  )
}

export default MobileMenu