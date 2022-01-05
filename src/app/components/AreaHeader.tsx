import classNames from 'classnames';

export default function AreaHeader({
    title,
    Icon,
    tools,
    className = '',
    ...props
}: {
    Icon: React.ComponentType<any>;
    tools?: React.ReactNode;
    title: React.ReactNode;
    className?: string;
    [key: string]: any;
}) {
    return (
        <div
            className={classNames(['flex items-center pb-4', className])}
            {...props}
        >
            <Icon className="mr-2 text-xl"></Icon>
            <span className="text-xl font-bold">{title}</span>
            <div className="flex-grow"></div>
            <div>{tools}</div>
        </div>
    );
}
