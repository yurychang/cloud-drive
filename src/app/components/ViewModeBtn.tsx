import { ViewMode } from '@custom-types/view-mode';
import { MdViewModule, MdOutlineViewList } from 'react-icons/md';
import IconBtn from './IconBtn';

export default function ViewModeBtn({
    mode,
    ...props
}: {
    mode: ViewMode;
    [key: string]: any;
}) {
    const Icon = mode === 'list' ? MdOutlineViewList : MdViewModule;
    return (
        <IconBtn {...props}>
            <Icon className="text-2xl" />
        </IconBtn>
    );
}

export function changeViewMode(mode: ViewMode) {
    return mode === 'list' ? 'card' : 'list';
}
