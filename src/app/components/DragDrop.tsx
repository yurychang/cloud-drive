import classNames from 'classnames';
import React, { useState } from 'react';

export default function DragDrop({
    dragOverClass,
    draggingClass,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    onDragLeave,
    children,
    className,
    host,
    ...restProps
}: {
    dragOverClass(isDragOver: boolean, isDragging: boolean): string;
    draggingClass(isDragging: boolean, isDragOver: boolean): string;
    host?: React.ReactNode;
} & React.ComponentProps<'div'>) {
    const [dragOver, setDragOver] = useState(false);
    const [dragging, setDragging] = useState(false);

    const dragDropProps = {
        onDragStart: (e: React.DragEvent<HTMLDivElement>) => {
            setDragging(true);
            onDragStart && onDragStart(e);
        },
        onDragEnd: (e: React.DragEvent<HTMLDivElement>) => {
            setDragging(false);
            onDragEnd && onDragEnd(e);
        },
        onDragOver: (e: React.DragEvent<any>) => {
            e.preventDefault();
            setDragOver(true);
            onDragOver && onDragOver(e);
        },
        onDrop: (e: React.DragEvent<any>) => {
            setDragOver(false);
            onDrop && onDrop(e);
        },
        onDragLeave: (e: React.DragEvent<any>) => {
            setDragOver(false);
            onDragLeave && onDragLeave(e);
        },
        className: classNames(
            className,
            dragOver && dragOverClass(dragOver, dragging),
            dragging && draggingClass(dragging, dragOver)
        ),
    };

    host = host ? React.Children.only(host) : <div>{children}</div>;
    const dragDrop = React.cloneElement(
        host as React.DetailedReactHTMLElement<any, any>,
        { ...restProps, ...dragDropProps }
    );

    return <>{dragDrop}</>;
}
