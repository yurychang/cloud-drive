import { CloudObject } from '@custom-types/object';
import classNames from 'classnames';
import { MdStar, MdOutlineStarOutline } from 'react-icons/md';

export default function FileCard({
    type,
    name,
    selected = false,
    starred = false,
    onStarChange,
    onSelectChange,
}: {
    type: CloudObject['type'];
    name: string;
    selected?: boolean;
    starred?: boolean;
    onStarChange?: (isStar: boolean) => void;
    onSelectChange?: (isSelect: boolean) => void;
}) {
    const StarIcon = starred ? MdStar : MdOutlineStarOutline;

    const cardClass = classNames([
        {
            'bg-yellow-200': selected,
            'bg-white': !selected,
        },
        'relative',
        'overflow-hidden',
        'shadow-sm',
        'hover:shadow',
        'rounded',
    ]);

    return (
        <div className={cardClass}>
            <div className="h-[120px] bg-neutral-100"></div>
            <p className="px-4 py-3 truncate bg-white">{name}</p>
        </div>
    );
}
