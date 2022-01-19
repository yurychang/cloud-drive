import classNames from 'classnames';
import { forwardRef } from 'react';
import { MdFolder } from 'react-icons/md';

export default forwardRef<
    HTMLDivElement,
    {
        name: string;
    } & React.ComponentProps<'div'>
>(function FolderCard({ name, className, ...restProps }, ref) {
    return (
        <div
            ref={ref}
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
});
