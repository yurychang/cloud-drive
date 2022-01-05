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
            className={classNames('flex px-2 bg-white rounded', className)}
            {...props}
        >
            {children}
        </div>
    );
};

List.Col = function ListCol({
    children,
    className = '',
    ...props
}: {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
}) {
    return (
        <div className={classNames('py-3 px-2', className)} {...props}>
            {children}
        </div>
    );
};
