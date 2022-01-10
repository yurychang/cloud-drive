import classNames from 'classnames';
import React, { useCallback, useRef, useState } from 'react';

export default function DragDrop({
    dragOverClass,
    draggingClass,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    onDragLeave,
    draggable = true,
    children,
    className,
    as: Component = 'div',
    ...restProps
}: {
    dragOverClass?: (isDragOver: boolean, isDragging: boolean) => string;
    draggingClass?: (isDragging: boolean, isDragOver: boolean) => string;
    as?: React.ElementType<any>;
} & React.ComponentProps<'div'>) {
    const dragDropEl = useRef<HTMLElement>();
    const [dragOver, setDragOver] = useState(false);
    const [dragging, setDragging] = useState(false);

    const dragDropProps = {
        ref: dragDropEl,
        draggable,
        onDragStart: useCallback(
            (e: React.DragEvent<HTMLDivElement>) => {
                setDragging(true);
                onDragStart && onDragStart(e);
            },
            [onDragStart]
        ),
        onDragEnd: useCallback(
            (e: React.DragEvent<HTMLDivElement>) => {
                setDragging(false);
                onDragEnd && onDragEnd(e);
            },
            [onDragEnd]
        ),
        onDragOver: useCallback(
            (e: React.DragEvent<any>) => {
                e.preventDefault();
                setDragOver(true);
                onDragOver && onDragOver(e);
            },
            [onDragOver]
        ),
        onDrop: useCallback(
            (e: React.DragEvent<any>) => {
                setDragOver(false);
                onDrop && onDrop(e);
            },
            [onDrop]
        ),
        onDragLeave: useCallback(
            (e: React.DragEvent<any>) => {
                const isContain = (dragDropEl.current as HTMLElement).contains(
                    e.relatedTarget as HTMLElement
                );
                !isContain && setDragOver(false);
                onDragLeave && onDragLeave(e);
            },
            [onDragLeave]
        ),
        className: classNames(
            className,
            dragOverClass && dragOverClass(dragOver, dragging),
            draggingClass && draggingClass(dragging, dragOver)
        ),
    };

    return (
        <Component {...dragDropProps} {...restProps}>
            {children}
        </Component>
    );
}
