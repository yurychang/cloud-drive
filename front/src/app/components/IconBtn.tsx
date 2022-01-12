import classNames from 'classnames';

export default function IconBtn({
    children,
    className = '',
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}) {
    return (
        <button
            className={classNames([
                'rounded-full p-2 transition-colors hover:bg-gray-200',
                className,
            ])}
            {...props}
        >
            {children}
        </button>
    );
}
