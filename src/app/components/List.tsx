import classNames from 'classnames';

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

List.Row = function ListRow({
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
            className={classNames(
                'flex px-2 h-12 leading-[3rem]  bg-white rounded',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

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
