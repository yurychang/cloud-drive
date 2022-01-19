import { CloudObject } from '@custom-types/object';
import { useMyObject } from '@features/object';
import ContextMenuTrigger from './ContextMenu';

export default function FileContextOptions({ id }: Pick<CloudObject, 'id'>) {
    const { deleteObject } = useMyObject({ fetch: false });
    return (
        <>
            <ContextMenuTrigger.Option>preview</ContextMenuTrigger.Option>
            <ContextMenuTrigger.Option>get link</ContextMenuTrigger.Option>
            <ContextMenuTrigger.Option>share</ContextMenuTrigger.Option>
            <ContextMenuTrigger.Option>download</ContextMenuTrigger.Option>
            <ContextMenuTrigger.Option onClick={() => deleteObject(id)}>
                delete
            </ContextMenuTrigger.Option>
        </>
    );
}
