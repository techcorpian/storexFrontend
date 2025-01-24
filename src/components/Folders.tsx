import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FcFolder, FcFile } from 'react-icons/fc';
import { RiFolderAddLine } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";

import AddModal from '../UIElements/Modal';
import CustomInput from '../UIElements/CustomInput';

export interface Folder {
  _id?: string;
  name: string;
  description: string;
  master_id: string;
  createdAt?: string;
}

export interface File {
  _id?: string;
  name: string;
  description: string;
  folder_id: string;
  createdAt?: string;
}

export interface Breadcrumbs {
  _id?: string;
  name: string;
  description: string;
  master_id: string;
  createdAt?: string;
}

const Folders: React.FC = () => {
  const [name, setName] = useState('');
  const [masterId, setMasterId] = useState('');
  const [folderId, setFolderId] = useState('');
  const [folderById, setFolderById] = useState<Folder[]>([]);
  const [fileById, setFileById] = useState<File[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs[]>([]);
  const [dropdown, setDropdown] = useState(false);
  const [isModal, setModal] = useState(false);
  const [modalType, setModalType] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();

  const api = import.meta.env.VITE_API

  const handleSubmit = async (type: number) => {
    if (!name) {
      alert('Please fill in the field.');
      return;
    }

    try {
      if (type === 1) {
        // Create Folder
        await axios.post(`${api}/api/folder/`, {
          name,
          master_id: masterId,
        });
      } else if (type === 2) {
        // Create File
        await axios.post(`${api}/api/file/`, {
          name,
          folder_id: folderId,
        });
      }

      fetchFoldersById();
      fetchFilesById();
      handleModalClose();
    } catch (error) {
      console.error('Error creating folder/file:', error);
    }
  };

  const fetchBreadcrumbsById = async () => {
    try {
      const response = await axios.get<{ breadcrumbs: Breadcrumbs[] }>(
        `${api}/api/folder/getBreadcrumbsById/${id}`
      );
      setBreadcrumbs(response.data.breadcrumbs || []);
    } catch (error) {
      console.error('Error fetching breadcrumbs:', error);
    }
  };

  const fetchFoldersById = async () => {
    try {
      const response = await axios.get<{ folder: Folder[] }>(
        `${api}/api/folder/getFolderById/${id}`
      );
      setFolderById(response.data.folder || []);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const fetchFilesById = async () => {
    try {
      const response = await axios.get<{ file: File[] }>(
        `${api}/api/file/getFileById/${id}`
      );
      setFileById(response.data.file || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchBreadcrumbsById();
    fetchFoldersById();
    fetchFilesById();
  }, [id]);

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDelete = async () => {
    try {
      // Call delete API for selected items
      await axios.post(`${api}/api/folder/deleteBulk`, { items: selectedItems });
      // Filter out deleted items from state
      setFolderById((prev) => prev.filter((item) => !selectedItems.includes(item._id!)));
      setFileById((prev) => prev.filter((item) => !selectedItems.includes(item._id!)));
      setSelectedItems([]); // Clear selected items
    } catch (error) {
      console.error('Error deleting items:', error);
    }
  };

  const handleDropdownOpen = () => {
    setDropdown(!dropdown);
  };

  const handleModalOpen = (type: number) => {
    setDropdown(false);
    setModal(true);
    setModalType(type);
    if (type === 1) {
      setMasterId(id || '');
    } else if (type === 2) {
      setFolderId(id || '');
    }
  };

  const handleModalClose = () => {
    setModal(false);
    setModalType(null);
    setMasterId('');
    setFolderId('');
    setName('');
  };

  const isFolder = (data: Folder | File): data is Folder => {
    return (data as Folder).master_id !== undefined;
  };

  return (
    <div className='bg-gray-100'>
      {isModal && (
        <AddModal onClose={handleModalClose} title={modalType === 1 ? "Add Folder" : "Add File"}>
          <CustomInput
            type="text"
            id="name"
            label={modalType === 1 ? "Enter Folder Name" : "Enter File Name"}
            value={name}
            setValue={setName}
          />
          <button
            onClick={() => handleSubmit(modalType!)}
            className='float-right px-4 py-2 border border-green-400 rounded-lg hover:bg-green-500 hover:border-green-400 mt-3 bg-green-400'
          >
            {modalType === 1 ? "Create Folder" : "Create File"}
          </button>
        </AddModal>
      )}
      <div className='text-xl font-bold text-gray-400 px-6 py-4 z-10 cursor-pointer'>
        <span className='text-black font-bold'>  {breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].name : ''}</span>
        Folders ({folderById.length}) & Files ({fileById.length})
      </div>
      <div className={`flex justify-between items-center border-y border-gray-300 w-full px-6 py-1 ${selectedItems.length === 0 ? "" : "bg-red-500"}`}>
        {selectedItems.length === 0 ? <button className='text-sm'>Back</button> : <div className='text-sm text-white'>Are You Sure You Want To Delete?</div>}
        {selectedItems.length === 0 ?
          <button className='text-2xl' onClick={handleDropdownOpen}>
            <RiFolderAddLine />
          </button>
          :
          <button
            className="text-2xl text-white rounded-lg"
            onClick={handleDelete}
            disabled={selectedItems.length === 0}
          >
            <AiTwotoneDelete />
          </button>}


      </div>
      {dropdown && (
        <div className='absolute right-5 top-25 bg-white shadow-lg rounded-md z-30'>
          <div
            onClick={() => handleModalOpen(1)}
            className='hover:bg-gray-200 px-3 py-1 rounded-t-md cursor-pointer'
          >
            Add a Folder
          </div>
          <div
            onClick={() => handleModalOpen(2)}
            className='hover:bg-gray-200 px-3 py-1 rounded-b-md cursor-pointer'
          >
            Add a File
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-start items-start gap-6 px-6 py-4">
        {[...(folderById || []), ...(fileById || [])]
          .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime())
          .map((data) => (
            <div key={data._id} className="relative">
              <input
                type="checkbox"
                className="absolute top-2 left-2"
                checked={selectedItems.includes(data._id!)}
                onChange={() => handleCheckboxChange(data._id!)}
              />
              {isFolder(data) ? (
                <Link
                  to={`/folder/${data._id}`}
                  className="flex flex-col justify-between items-center text-sm font-light w-[120px] border rounded-lg shadow-lg hover:shadow-none py-4 px-2"
                >
                  <span className="text-6xl text-center">
                    <FcFolder />
                  </span>
                  <div className="w-full break-words text-center">{data.name}</div>
                </Link>
              ) : (
                <div className="flex flex-col h-full justify-between items-center text-sm font-light w-[120px] border rounded-lg py-4 px-2">
                  <span className="text-6xl text-center">
                    <FcFile />
                  </span>
                  <div className="w-full break-words text-center">{data.name}</div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Folders;
