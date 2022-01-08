import classNames from 'classnames';
import React, { PropsWithChildren, useEffect, useState } from 'react';
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
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const menuClassName = classNames(
        'fixed z-50 flex flex-col py-1 min-w-[150px] rounded shadow-lg bg-white transition-opacity',
        {
            invisible: !visible,
            'opacity-1': visible,
            'opacity-0': !visible,
        }
    );

    useEffect(() => {
        const handler = () => {
            setVisible(false);
        };
        document.body.addEventListener('pointerdown', handler);

        return () => {
            document.body.removeEventListener('pointerdown', handler);
        };
    }, []);

    return (
        <>
            <div
                onContextMenu={(e) => {
                    e.preventDefault();
                    setVisible(true);
                    setPosition({
                        x: e.clientX,
                        y: e.clientY,
                    });
                }}
                {...restProps}
            >
                {children}
            </div>
            {visible &&
                createPortal(
                    <div
                        className={menuClassName}
                        style={{
                            top: `${position.y}px`,
                            left: `${position.x}px`,
                        }}
                    >
                        {menuContent}
                    </div>,
                    document.body
                )}
        </>
    );
}

function ContextMenuOption({
    children,
}: PropsWithChildren<React.ComponentProps<'div'>>) {
    return (
        <button className="px-4 py-2 text-left hover:bg-gray-100">
            {children}
        </button>
    );
}

ContextMenu.Option = ContextMenuOption;
