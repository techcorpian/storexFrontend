import React, { useEffect, useState } from 'react';
// import { BiMemoryCard } from "react-icons/bi";
import { RiDashboard3Line } from "react-icons/ri";
// import { IoFolderOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { GoProject } from "react-icons/go";

import AddModal from "../UIElements/Modal";
import CustomInput from "../UIElements/CustomInput";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store"; // Import from Redux store
import { fetchProjects, addProject } from "../redux/slices/projectSlice";
import { Link, useLocation } from 'react-router-dom';

const SideFolders: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { allprojects, loading } = useSelector((state: RootState) => state.projects);

    const [isModal, setModal] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const handleModalOpen = () => setModal(true);
    const handleModalClose = () => {
        setModal(false);
        setName("");
    };

    const handleSubmit = async () => {
        if (name.trim()) {
            await dispatch(addProject(name));
            handleModalClose();
        }
    };

    const projectTitle="Add Projects";
    const projectDesc="Add projects by entering entering it in the input";

    return (
        <>
            <div className='fixed z-0 bg-white w-1/6 h-screen shadow-lg flex flex-col gap-4 rounded-xl border border-neutral-300 px-2'>
                <div>
                    <Link to='/home' className={`mt-16 flex items-center gap-3 font-light text-sm px-4 py-2 rounded-md hover:bg-neutral-200 ${location.pathname === `/home` ? "bg-neutral-200 text-neutral-900 font-light" : ""}`}>
                        <span className='text-lg'><RiDashboard3Line /></span>Dashboard
                    </Link>
                </div>

                <div>
                    <div className='flex justify-between items-center px-2'>
                        <div className='text-sm text-neutral-400 font-bold'>Projects</div>
                        <div className='text-sm text-neutral-500 hover:text-neutral-700 cursor-pointer' onClick={handleModalOpen}><FaPlus/></div>
                    </div>

                    {loading ? <p>Loading...</p> : allprojects.map((data) => (
                        <Link
                            key={data._id}
                            to={`/folder/${data._id}`}
                            className={`flex items-center gap-3 text-sm px-4 py-2 rounded-md hover:bg-neutral-200 ${location.pathname === `/folder/${data._id}` ? "bg-neutral-200 text-neutral-900" : ""} font-light`}
                        >
                            <span className="text-lg"><GoProject /></span>
                            {data.name}
                        </Link>
                    ))}
                </div>
            </div>

            {isModal && (
                <AddModal onClose={handleModalClose} title={projectTitle} desc={projectDesc}>
                    <CustomInput
                        type="text"
                        id="name"
                        label="Enter Project Name"
                        value={name}
                        setValue={setName}
                    />
                    <button
                        onClick={handleSubmit}
                        className="float-right px-4 py-2 border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-900 mt-3 bg-neutral-800 text-white"
                    >
                        Create Project
                    </button>
                </AddModal>
            )}
        </>
    );
};

export default SideFolders;
