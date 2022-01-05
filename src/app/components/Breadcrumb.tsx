import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { MdArrowForwardIos, MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface BreadcrumbInterface
    extends React.FC<{
        className?: string;
    }> {
    Item: React.FC;
    Separator: React.FC;
}

const Breadcrumb: BreadcrumbInterface = ({
    className,
    children,
    ...restProps
}) => {
    const crumbs = toArray(children).flatMap((item, i) =>
        i > 0
            ? [<BreadcrumbSeparator key={i}></BreadcrumbSeparator>, item]
            : [item]
    );
    return (
        <div
            className={classNames('flex items-center', className)}
            {...restProps}
        >
            {crumbs}
        </div>
    );
};

const BreadcrumbItem: React.FC<{ className?: string }> = ({
    className,
    children,
    ...restProps
}) => {
    return (
        <div className={classNames(className)} {...restProps}>
            {children}
        </div>
    );
};
Breadcrumb.Item = BreadcrumbItem;

const BreadcrumbSeparator: React.FC<{ className?: string }> = ({
    className,
    ...restProps
}) => {
    return (
        <MdOutlineKeyboardArrowRight
            className={classNames('mx-1', className)}
            {...restProps}
        />
    );
};
Breadcrumb.Separator = BreadcrumbSeparator;

export default Breadcrumb;
