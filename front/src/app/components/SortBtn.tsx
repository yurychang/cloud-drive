import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import IconBtn from './IconBtn';

export default function SortBtn({
    asc,
    ...props
}: {
    asc: boolean;
    [key: string]: any;
}) {
    const Icon = asc ? MdArrowDownward : MdArrowUpward;
    return (
        <IconBtn {...props}>
            <Icon />
        </IconBtn>
    );
}
