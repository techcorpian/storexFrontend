import { useState, useEffect } from 'react'
import axios from 'axios'

export interface Folder {
  _id?: string;
  name: string;
  description: string;
  master_id: string;
}

export interface File {
  _id?: string;
  name: string;
  description: string;
  folder_id: string;
}

const Home = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const api = import.meta.env.VITE_API

  const fetchFolders = async () => {
    const response = await axios.get<Folder[]>(`${api}/api/folder/`);
    console.log(response);
    setFolders(response.data);
  };

  const fetchFiles = async () => {
    const response = await axios.get<File[]>(`${api}/api/file/`);
    console.log(response);
    setFiles(response.data);
  };

  useEffect(() => {
    fetchFolders();
    fetchFiles();
  }, []);

  const Dashboard = [
    {
      title: "Total",
      count: folders.length + files.length
    },
    {
      title: "Files",
      count: files.length
    },
    {
      title: "Folders",
      count: folders.length
    },
    {
      title: "Projects",
      count: 2
    }
  ]
  return (
    <>
    <div className='px-6 py-3 bg-gray-100 text-3xl font-semibold text-neutral-800'>Dashboard</div>
    <div className='flex md:flex-row flex-col justify-between px-10 py-6 bg-gray-100 gap-6'>
      
      {
        Dashboard.map((data, index) => (
          <div key={index} className='border w-full px-4 py-3 rounded-lg bg-white text-center font-bold uppercase shadow-lg'>
            <div className='text-2xl text-gray-400'>{data.title}</div>
            <div className='text-4xl'>{data.count}</div>
          </div>
        ))
      }

    </div>
    </>
  )
}

export default Home