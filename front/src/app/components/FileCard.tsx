import classNames from 'classnames';
import { MdInsertDriveFile } from 'react-icons/md';

export default function FileCard({
    name,
    className,
    ...restProps
}: { name: string } & React.ComponentProps<'div'>) {
    const cardClass = classNames([
        'relative',
        'overflow-hidden',
        'shadow-sm',
        'hover:shadow',
        'rounded',
    ]);

    return (
        <div className={classNames(cardClass, className)} {...restProps}>
            <div className="h-[120px] bg-neutral-100"></div>
            <div className="flex items-center px-4 bg-white">
                <MdInsertDriveFile className="mr-3 text-xl" />
                <p className="py-3 truncate">{name}</p>
            </div>
        </div>
    );
}
