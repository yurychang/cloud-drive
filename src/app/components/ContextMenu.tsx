import classNames from 'classnames';
import React, { PropsWithChildren, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ContextMenuProps = PropsWithChildren<
    {
        menuContent?: React.ReactNode;
    } & React.ComponentProps<'div'>
>;

export default function ContextMenu({
    children,
    menuContent,
    ...restProps
}: ContextMenuProps) {
    const host = useRef(null);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const menuClassName = classNames(
        'absolute flex flex-col py-1 min-w-[150px] rounded shadow-lg bg-white transition-opacity',
        {
            invisible: !visible,
            'opacity-1': visible,
            'opacity-0': !visible,
        }
    );

    const showMenuFromEvent = (e: React.MouseEvent) => {
        const { left, right, top, bottom } = (
            host.current as unknown as HTMLElement
        ).getBoundingClientRect();
        const onHost =
            e.clientX >= left &&
            e.clientX <= right &&
            e.clientY >= top &&
            e.clientY <= bottom;

        if (onHost) {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const child = React.Children.only(children) as React.ReactElement;
    const contextMenu = React.cloneElement(child, {
        ref: host,
        onContextMenu: (e: React.MouseEvent) => {
            e.preventDefault();
            showMenuFromEvent(e);
        },
        ...restProps,
    });

    return (
        <>
            {contextMenu}
            {visible &&
                createPortal(
                    <>
                        <div
                            className="fixed inset-0 z-50 "
                            onClick={() => {
                                setVisible(false);
                            }}
                            onContextMenu={e => {
                                e.preventDefault();
                                showMenuFromEvent(e);
                            }}
                        >
                            <div
                                className={menuClassName}
                                style={{
                                    top: `${position.y}px`,
                                    left: `${position.x}px`,
                                }}
                            >
                                {menuContent}
                            </div>
                        </div>
                    </>,
                    document.body
                )}
        </>
    );
}

function ContextMenuOption({
    children,
    ...restProps
}: PropsWithChildren<React.ComponentProps<'button'>>) {
    return (
        <button
            className="px-4 py-2 text-left hover:bg-gray-100"
            {...restProps}
        >
            {children}
        </button>
    );
}

ContextMenu.Option = ContextMenuOption;
