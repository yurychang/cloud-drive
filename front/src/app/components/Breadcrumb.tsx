import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import DragDrop, { DragDropProps } from './DragDrop';

interface BreadcrumbInterface extends React.FC<React.ComponentProps<'div'>> {
    Item: React.FC<
        { as?: ReactNode } & DragDropProps & React.ComponentProps<'div'>
    >;
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

const BreadcrumbItem: BreadcrumbInterface['Item'] = ({
    className,
    children,
    as: Node = 'div',
    ...restProps
}) => {
    const hoverClass = 'hover:bg-gray-200';
    const dragOverClass = 'bg-gray-200';
    return (
        <DragDrop
            as={Node}
            draggable="false"
            className={classNames('py-1 px-2 rounded', hoverClass, className)}
            dragOverClass={isOver => isOver && dragOverClass}
            {...restProps}
        >
            {children}
        </DragDrop>
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
