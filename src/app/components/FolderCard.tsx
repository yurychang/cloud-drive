import { MdFolder } from 'react-icons/md';
import ContextMenu from './ContextMenu';

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
        <ContextMenu
            menuContent={
                <>
                    <ContextMenu.Option>get link</ContextMenu.Option>
                    <ContextMenu.Option>share</ContextMenu.Option>
                    <ContextMenu.Option>download</ContextMenu.Option>
                </>
            }
        >
            <div
                className="px-4 py-4 flex items-center bg-white overflow-hidden shadow-sm select-none hover:shadow rounded"
                {...restProps}
            >
                <MdFolder className="mr-3 text-xl flex-shrink-0"></MdFolder>
                <span className="font-bold truncate">{name}</span>
            </div>
        </ContextMenu>
    );
}
