import { CloudObject } from '@custom-types/object';
import classNames from 'classnames';
import { MdInsertDriveFile } from 'react-icons/md';
import ContextMenu from './ContextMenu';

export default function FileCard({
    type,
    name,
    selected = false,
    starred = false,
    onStarChange,
    onSelectChange,
}: {
    type: CloudObject['type'];
    name: string;
    selected?: boolean;
    starred?: boolean;
    onStarChange?: (isStar: boolean) => void;
    onSelectChange?: (isSelect: boolean) => void;
}) {
    const cardClass = classNames([
        {
            'bg-yellow-200': selected,
            'bg-white': !selected,
        },
        'relative',
        'overflow-hidden',
        'shadow-sm',
        'hover:shadow',
        'rounded',
        'select-none',
    ]);

    return (
        <>
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
                <div className={cardClass}>
                    <div className="h-[120px] bg-neutral-100"></div>
                    <div className="flex items-center px-4">
                        <MdInsertDriveFile className="mr-3 text-xl" />
                        <p className="py-3 truncate bg-white">{name}</p>
                    </div>
                </div>
            </ContextMenu>
        </>
    );
}
