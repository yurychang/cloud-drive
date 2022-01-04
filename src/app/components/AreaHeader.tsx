import classNames from 'classnames';

export default function AreaHeader({
    title,
    Icon,
    className = '',
    ...props
}: {
    Icon: React.ComponentType<any>;
    title: string;
    className?: string;
    [key: string]: any;
}) {
    return (
        <div
            className={classNames(['flex', 'items-center', className])}
            {...props}
        >
            <Icon className="mr-2 text-xl"></Icon>
            <span className="text-xl font-bold">{title}</span>
        </div>
    );
}
