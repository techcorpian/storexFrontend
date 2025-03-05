import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { DateFormatter } from "../utils/CommonFunc";
import { toggleSelectItem } from "../redux/slices/folderSlice";
import { File } from "../utils/Interfaces";

interface FileCardProps {
    data: File;
}

const FileCard: React.FC<FileCardProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedItems } = useSelector((state: RootState) => state.folders);

    return (
        <div className="flex flex-col justify-end items-center border border-neutral-400 text-sm font-light w-[180px] h-[160px] rounded-tr-3xl hover:shadow-none px-1 bg-white">
            <div className="flex justify-between w-full px-1 pr-3 pb-1">
                <input
                    type="checkbox"
                    className=""
                    checked={selectedItems.includes(data._id!)}
                    onChange={() => dispatch(toggleSelectItem(data._id!))}
                />
                <div className="text-xs text-black font-semibold">{DateFormatter(data.createdAt)}</div>
            </div>
            <span className="text-center w-full h-5/6 px-2 py-2 border-t border-neutral-400">
                <div className="w-full break-words text-left text-black font-semibold">{data.name}</div>
            </span>
        </div>
    )
}

export default FileCard