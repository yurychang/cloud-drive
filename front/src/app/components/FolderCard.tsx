import classNames from 'classnames';
import { MdFolder } from 'react-icons/md';
import ContextMenu from './ContextMenu';

export default function FolderCard({
    name,
    selected = false,
    starred = false,
    onStarChange,
    onSelectChange,
    className,
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
                    <ContextMenu.Option>delete</ContextMenu.Option>
                </>
            }
        >
            <div
                className={classNames(
                    'px-4 py-4 flex items-center bg-white overflow-hidden shadow-sm select-none hover:shadow rounded',
                    className
                )}
                {...restProps}
            >
                <MdFolder className="mr-3 text-xl flex-shrink-0"></MdFolder>
                <span className="font-bold truncate">{name}</span>
            </div>
        </ContextMenu>
    );
}
