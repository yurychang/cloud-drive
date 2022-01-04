import { MdFolder } from 'react-icons/md';

export default function FolderCard({
    name,
    selected = false,
    starred = false,
    onStarChange,
    onSelectChange,
}: {
    name: string;
    selected?: boolean;
    starred?: boolean;
    onStarChange?: (isStar: boolean) => void;
    onSelectChange?: (isSelect: boolean) => void;
}) {
    return (
        <div className="px-4 py-4 flex items-center bg-white overflow-hidden shadow-sm hover:shadow rounded">
            <MdFolder className="mr-3 text-xl flex-shrink-0"></MdFolder>
            <span className="font-bold truncate">{name}</span>
        </div>
    );
}
