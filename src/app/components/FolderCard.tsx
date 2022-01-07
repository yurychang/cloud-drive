import { MdFolder } from 'react-icons/md';

export default function FolderCard({
    name,
    selected = false,
    starred = false,
    onStarChange,
    onSelectChange,
    ...restProps
}: {
    name: string;
    selected?: boolean;
    starred?: boolean;
    onStarChange?: (isStar: boolean) => void;
    onSelectChange?: (isSelect: boolean) => void;
} & React.ComponentProps<'div'>) {
    return (
        <div
            className="px-4 py-4 flex items-center bg-white overflow-hidden shadow-sm hover:shadow rounded"
            {...restProps}
        >
            <MdFolder className="mr-3 text-xl flex-shrink-0"></MdFolder>
            <span className="font-bold truncate">{name}</span>
        </div>
    );
}
