import classNames from 'classnames';
import { MdFolder } from 'react-icons/md';

export default function FolderCard({
    name,
    className,
    ...restProps
}: {
    name: string;
} & React.ComponentProps<'div'>) {
    return (
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
    );
}
