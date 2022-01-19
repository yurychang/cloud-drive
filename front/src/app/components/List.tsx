import React, { createRef, forwardRef, useRef } from 'react';
import classNames from 'classnames';
import { DragDrop, DragDropProps } from './DragDrop';

export default function List({
    children,
    ...props
}: {
    children?: React.ReactNode;
    [key: string]: any;
}) {
    return <div {...props}>{children}</div>;
}

List.Header = function ListHeader({
    children,
    className = '',
    ...props
}: {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
}) {
    return (
        <div
            className={classNames('flex pb-2 px-2 font-bold', className)}
            {...props}
        >
            {children}
        </div>
    );
};

List.Body = function ListBody({
    children,
    className = '',
    ...props
}: {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
}) {
    return (
        <div className={classNames('grid gap-y-2', className)} {...props}>
            {children}
        </div>
    );
};

List.Row = forwardRef<
    HTMLDivElement,
    {
        children?: React.ReactNode;
        className?: string;
        canDrop?: boolean;
    } & React.ComponentProps<'div'>
>(function ListRow(
    { children, className = '', canDrop = false, ...props },
    ref
) {
    const dragOverClass = (isDragOver: boolean, isDragging: boolean) =>
        canDrop && isDragOver && !isDragging ? 'bg-gray-200' : 'bg-white';
    return (
        <DragDrop
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /* @ts-ignore */
            ref={ref}
            className={classNames(
                'flex px-2 h-12 leading-[3rem] rounded',
                { 'bg-white': !canDrop },
                className
            )}
            dragOverClass={dragOverClass}
            {...props}
        >
            {children}
        </DragDrop>
    );
});

List.Col = function ListCol({
    children,
    className = '',
    alignCenter,
    ...props
}: {
    children?: React.ReactNode;
    className?: string;
    alignCenter?: boolean;
    [key: string]: any;
}) {
    return (
        <div
            className={classNames(
                'relative px-2',
                {
                    [`flex items-center`]: alignCenter,
                },
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
