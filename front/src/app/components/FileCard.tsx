import classNames from 'classnames';
import { forwardRef } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';

export default forwardRef<
    HTMLDivElement,
    { name: string } & React.ComponentProps<'div'>
>(function FileCard({ name, className, ...restProps }, ref) {
    const cardClass = classNames([
        'relative',
        'overflow-hidden',
        'shadow-sm',
        'hover:shadow',
        'rounded',
    ]);

    return (
        <div
            ref={ref}
            className={classNames(cardClass, className)}
            {...restProps}
        >
            <div className="h-[120px] bg-neutral-100"></div>
            <div className="flex items-center px-4 bg-white">
                <MdInsertDriveFile className="mr-3 text-xl" />
                <p className="py-3 truncate">{name}</p>
            </div>
        </div>
    );
});
