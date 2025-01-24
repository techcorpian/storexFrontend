import React, { ReactNode } from 'react';
import { CgCloseO } from "react-icons/cg";

interface SliderPanelProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
}

const SliderPanel: React.FC<SliderPanelProps> = ({ isOpen, onClose, children, title }) => {
    return (
        <div
            className={`fixed top-0 right-0 rounded-l-3xl py-4 px-6 z-20 md:h-full lg:w-3/4 w-full bg-gray-50 border shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            {/* Panel Header */}
            <div className="flex text-black/70 justify-between items-center">
                <div className="text-2xl font-bold">
                    {title}
                </div>
                <button onClick={onClose} className="text-xl text-red-500">
                    <CgCloseO />
                </button>
            </div>
            
            {/* Panel Content with Scroll */}
            <div className="py-6 h-full max-h-screen overflow-y-auto pb-16">
                {children}
            </div>
        </div>
    );
};

export default SliderPanel;