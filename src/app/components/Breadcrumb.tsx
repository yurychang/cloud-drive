import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface BreadcrumbInterface extends React.FC<React.ComponentProps<'div'>> {
    Item: React.FC<{ as?: ReactNode } & React.ComponentProps<any>>;
    Separator: React.FC<React.ComponentProps<IconType>>;
}

const Breadcrumb: BreadcrumbInterface = ({
    className,
    children,
    ...restProps
}) => {
    const crumbs = toArray(children).flatMap((item, i) =>
        i > 0
            ? [
                  <BreadcrumbSeparator
                      key={'BreadcrumbSeparator' + i}
                  ></BreadcrumbSeparator>,
                  item,
              ]
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

const BreadcrumbItem: React.FC<
    { as?: ReactNode } & React.ComponentProps<any>
> = ({ className, children, as: Node = 'div', ...restProps }) => {
    return (
        <Node className={classNames(className)} {...restProps}>
            {children}
        </Node>
    );
};
Breadcrumb.Item = BreadcrumbItem;

const BreadcrumbSeparator: React.FC<React.ComponentProps<IconType>> = ({
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
