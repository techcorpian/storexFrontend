import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FolderCard from "../UIElements/FolderCard";
import FileCard from "../UIElements/FileCard";

//Redux store
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchFolders, fetchFoldersById, fetchFilesById, fetchBreadcrumbsById, createFolder, createFile, deleteSelectedItems } from "../redux/slices/folderSlice";
import { fetchProjects } from "../redux/slices/projectSlice";

//Icons
import { BiSolidAddToQueue } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoFolderOpenSharp } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi2";

//UIElements
import AddModal from "../UIElements/Modal";
import CustomInput from "../UIElements/CustomInput";

const Folders: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const { allfolders, folders, files, selectedItems } = useSelector((state: RootState) => state.folders);
  // const { allprojects } = useSelector((state: RootState) => state.projects);

  const [name, setName] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [isModal, setModal] = useState(false);
  const [modalType, setModalType] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchBreadcrumbsById(id));
      dispatch(fetchFoldersById(id));
      dispatch(fetchFilesById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchFolders());
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleSubmit = async (type: number) => {
    if (!name) return alert("Please enter a name");

    try {
      if (type === 1) {
        await dispatch(createFolder({ name, masterId: id! })).unwrap();
      } else {
        await dispatch(createFile({ name, folderId: id! })).unwrap();
      }

      dispatch(fetchFoldersById(id!));  // Refetch updated data
      dispatch(fetchFilesById(id!));
      handleModalClose();
    } catch (error) {
      console.error("Error creating folder/file:", error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleModalOpen = (type: number) => {
    setDropdown(false);
    setModal(true);
    setModalType(type);
  };

  const handleModalClose = () => {
    setModal(false);
    setModalType(null);
    setName("");
  };

  const currentFolder = allfolders.find(folder => folder._id === id);
  // const currentProject = allprojects.find(project => project._id === id);

  //folder variables
  const folderTitle = "Add Folder"
  const folderDesc = "Add folders by entering entering it in the input";
  const folderLabel = "Enter Folder Name"

  //file variables
  const fileTitle = "Add File"
  const fileDesc = "Add file by entering entering it in the input";
  const fileLabel = "Enter File Name"

  return (
    <div className="bg-gray-100">
      {isModal && (
        <AddModal onClose={handleModalClose} title={modalType === 1 ? folderTitle : fileTitle} desc={modalType === 1 ? folderDesc : fileDesc}>
          <CustomInput
            type="text"
            id="name"
            label={modalType === 1 ? folderLabel : fileLabel}
            value={name}
            setValue={setName}
          />
          <button
            onClick={() => handleSubmit(modalType!)}
            className="float-right px-4 py-2 border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-900 mt-3 bg-neutral-800 text-white"
          >
            {modalType === 1 ? "Create Folder" : "Create File"}
          </button>
        </AddModal>
      )}

      <div className="flex items-center text-2xl font-semibold text-gray-600 bg-gray-100 px-6 py-4">
        <span className="text-black font-bold pr-3 text-xl">{currentFolder ? currentFolder.name : "Projects"} -</span>

        <div className="flex gap-4 relative">
          {/* Folder Icon */}
          <div className="relative flex items-center">
            <IoFolderOpenSharp className="text-yellow-500 text-3xl" />
            <span className="absolute -top-1 -right-2 bg-neutral-200 border border-neutral-500 text-neutral-900 text-xs px-1.5 py-0.5 rounded-md">
              {folders.length}
            </span>
          </div>

          {/* Document Icon */}
          <div className="relative flex items-center">
            <HiDocumentText className="text-blue-500 text-3xl" />
            <span className="absolute -top-1 -right-2 bg-neutral-200 border border-neutral-500 text-neutral-900 text-xs px-1.5 py-0.5 rounded-md">
              {files.length}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`flex justify-between items-center border-y border-gray-300 w-full px-6 py-1 ${selectedItems.length === 0 ? "" : "bg-red-700"
          }`}
      >
        {selectedItems.length === 0 ? (
          <button onClick={handleBack} className="text-sm">Back</button>
        ) : (
          <div className="text-sm text-neutral-200">Are You Sure You Want To Delete?</div>
        )}

        {selectedItems.length === 0 ? (
          <button className="text-2xl text-neutral-800 hover:text-neutral-700" onClick={() => setDropdown(!dropdown)}>
            <BiSolidAddToQueue />
          </button>
        ) : (
          <button
            className="text-2xl text-neutral-200 rounded-lg"
            onClick={() => dispatch(deleteSelectedItems(selectedItems))}
            disabled={selectedItems.length === 0}
          >
            <AiTwotoneDelete />
          </button>
        )}
      </div>

      {dropdown && (
        <div className="absolute right-5 top-25 bg-white shadow-lg rounded-md z-30 text-sm">
          <div onClick={() => handleModalOpen(1)} className="hover:bg-gray-200 px-3 py-2 rounded-t-md cursor-pointer border-b">
            Add a Folder
          </div>
          <div onClick={() => handleModalOpen(2)} className="hover:bg-gray-200 px-3 py-2 rounded-b-md cursor-pointer">
            Add a File
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-start items-start gap-6 px-9 py-4">
        {[...folders, ...files]
          .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime())
          .map((data) => (
            <div key={data._id} className="relative">
              {"master_id" in data ? (
                <FolderCard data={data} />
              ) : (
                <FileCard data={data}/>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Folders;
