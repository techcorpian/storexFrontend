import React, { ReactNode, useEffect } from 'react';

interface Props {
    onClose: () => void;
    children: ReactNode;
    title: string;
    desc: string;
}

const Modal: React.FC<Props> = ({ onClose, children, title, desc }) => {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('modal-backdrop')) {
                onClose();
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div className="modal-backdrop absolute top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center z-10">
            <div className="bg-gray-100 rounded-xl shadow-xl w-1/2 px-6 py-4">
                <div className='flex justify-between items-center'>
                    <div className='text-2xl font-bold'>{title}</div>
                    
                    <span
                        onClick={onClose}
                        className="cursor-pointer text-2xl font-bold"
                    >
                        ×
                    </span>
                </div>
                <p className='leading-5 text-md font-light'>{desc}</p>
                <div className="pt-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
