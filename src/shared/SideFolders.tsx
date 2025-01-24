import React, { useState, useEffect } from 'react'
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

const SideFolders: React.FC = () => {
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
        <div className='fixed z-0 bg-white w-1/6 h-screen shadow-lg flex flex-col gap-4'>
            <div>
                <Link to='/home' className={`mt-16 flex items-center gap-3 px-4 hover:bg-gray-200 py-1 ${location.pathname === `/home` ? "bg-gray-200" : ""
                    }`}><span className='text-blue-500 text-lg'><RiDashboard3Line /></span>Dashboard</Link>
            </div>
            <div>
                <div className='text-sm text-gray-400 font-bold px-4'>Favorites</div>
                <Link to='/mydrive' className='flex items-center gap-3 px-4 hover:bg-gray-200 py-1'><span className='text-blue-500 text-lg'><BiMemoryCard /></span>Personal Drive</Link>
            </div>
            <div>
                <div className=' text-sm text-gray-400 font-bold px-4'>Projects</div>
                {folders.map((data) =>
                    data.master_id == 0 ? (
                        <Link
                            key={data._id}
                            to={`/folder/${data._id}`}
                            className={`flex items-center gap-3 hover:bg-gray-200 px-4 py-1 ${location.pathname === `/folder/${data._id}` ? "bg-gray-200" : ""
                                } font-light`}
                        >
                            <span className="text-blue-500 text-lg">
                                <IoFolderOutline />
                            </span>
                            {data.name}
                        </Link>
                    ) : null
                )}
            </div>
        </div>
    )
}

export default SideFolders