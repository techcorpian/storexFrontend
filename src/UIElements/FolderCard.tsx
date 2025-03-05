import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { DateFormatter } from "../utils/CommonFunc";
import { toggleSelectItem, clearSelectedItems } from "../redux/slices/folderSlice";
import { Folder } from "../utils/Interfaces";

interface FolderCardProps {
    data: Folder;
}

const FolderCard: React.FC<FolderCardProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedItems } = useSelector((state: RootState) => state.folders);

    console.log(data)

    // const handleViewOpen = (id: string) => {
    //     alert(id)
    // }

    const navigate = useNavigate();
    const handleNavigate = (id: any) => {
        dispatch(clearSelectedItems())
        navigate(`/folder/${id}`)
    }

    return (
        <div
            onClick={() => handleNavigate(data._id)}
            // onClick={() => handleViewOpen(data._id)}
            className="flex flex-col justify-end items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-sm font-light w-[180px] h-[160px] rounded-tr-3xl hover:shadow-none "
        >
            <div className="flex justify-between w-full px-2 pr-4 pb-1">
                <input
                    type="checkbox"
                    className=""
                    checked={selectedItems.includes(data._id!)}
                    onChange={() => dispatch(toggleSelectItem(data._id!))}
                />
                <div className="text-xs text-white font-semibold">{DateFormatter(data.createdAt ?? '')}</div>
            </div>
            <span className="text-center w-full h-5/6 bg-white border border-neutral-400 rounded-tr-2xl px-3 py-2 shadow-lg">
                <div className="w-full break-words text-left text-black font-semibold">{data.name}</div>
            </span>

        </div>
    )
}

export default FolderCard