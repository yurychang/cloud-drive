import classNames from 'classnames';
import React, {
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

interface TriggerContextInterface {
    onPopupMouseDown: React.MouseEventHandler<HTMLElement>;
}

const TriggerContext = React.createContext<TriggerContextInterface>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPopupMouseDown() {},
});

type ContextMenuTriggerProps = {
    menuContent?: React.ReactNode;
} & React.ComponentProps<'div'>;

export default function ContextMenuTrigger({
    children,
    menuContent,
    ...restProps
}: ContextMenuTriggerProps) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const triggerRef = useRef(null);

    const triggerMenu = (e: MouseEvent | React.MouseEvent) => {
        if (e.type !== 'contextmenu') {
            setVisible(false);
        } else {
            const { left, right, top, bottom } = (
                triggerRef.current as unknown as HTMLElement
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
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', triggerMenu);

        return () => {
            document.removeEventListener('mousedown', triggerMenu);
        };
    }, []);

    const onPopupMouseDown = useCallback(() => {
        setVisible(false);
    }, []);

    const child = React.Children.only(children) as React.ReactElement;
    const triggerProps = {
        ref: triggerRef,
        onContextMenu: (e: React.MouseEvent) => {
            e.preventDefault();
            triggerMenu(e);
        },
        ...restProps,
    };

    const trigger = React.cloneElement(child, triggerProps);

    const menuClassName = classNames(
        'absolute flex flex-col py-1 min-w-[150px] rounded shadow-lg bg-white transition-opacity',
        {
            invisible: !visible,
            'opacity-1': visible,
            'opacity-0': !visible,
        }
    );

    return (
        <TriggerContext.Provider value={{ onPopupMouseDown }}>
            {trigger}
            {visible &&
                createPortal(
                    <>
                        <div
                            className={menuClassName}
                            style={{
                                top: `${position.y}px`,
                                left: `${position.x}px`,
                            }}
                        >
                            {menuContent}
                        </div>
                    </>,
                    document.body
                )}
        </TriggerContext.Provider>
    );
}

function ContextMenuOption({
    children,
    onClick,
    ...restProps
}: PropsWithChildren<React.ComponentProps<'button'>>) {
    const { onPopupMouseDown } = useContext(TriggerContext);
    return (
        <button
            className="px-4 py-2 text-left hover:bg-gray-100"
            onClick={e => {
                onPopupMouseDown(e);
                onClick && onClick(e);
            }}
            {...restProps}
        >
            {children}
        </button>
    );
}

ContextMenuTrigger.Option = ContextMenuOption;
