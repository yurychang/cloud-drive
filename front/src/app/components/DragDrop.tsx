import classNames from 'classnames';
import React, { forwardRef, useCallback, useState } from 'react';

export function DragDropContainer({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div className={classNames('relative', className)} {...props}>
            {children}
            <div className="absolute inset-0"></div>
        </div>
    );
}

export type DragDropProps = {
    dragOverClass?: (
        isDragOver: boolean,
        isDragging: boolean
    ) => Parameters<typeof classNames>[0];
    draggingClass?: (
        isDragging: boolean,
        isDragOver: boolean
    ) => Parameters<typeof classNames>[0];
    as?: React.ElementType<any>;
} & React.ComponentProps<'div'>;

export const DragDrop = forwardRef<HTMLDivElement, DragDropProps>(
    function DragDrop(
        {
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
        },
        ref
    ) {
        const [dragOver, setDragOver] = useState(false);
        const [dragging, setDragging] = useState(false);

        const dragDropProps = {
            ref,
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
                    const isContain = (e.currentTarget as HTMLElement).contains(
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
);
