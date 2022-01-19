import { MockedRequest, rest } from 'msw';
import { CloudObject } from '@custom-types/object';
import { appSetting } from 'src/app/appSetting';

const objectDb: { [key: string]: CloudObject[] } = {};

export default [
    rest.get(appSetting.apiUrl + '/objects', (req, res, ctx) => {
        const path = req.url.searchParams.get('path') || '/';

        const objects = (objectDb[path] =
            objectDb[path] ||
            createObjects(Math.round(Math.random() * 15)).map(object => ({
                ...object,
                id: `object${path.replaceAll('/', '-')}_${object.id}`,
                path: path,
            }))).sort((a, b) => a.name.localeCompare(b.name));

        return res(
            ctx.status(200),
            ctx.json({
                data: objects,
            })
        );
    }),
    rest.get(appSetting.apiUrl + '/objects/recent', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: createObjects(4),
            })
        );
    }),
    rest.get(appSetting.apiUrl + '/objects/shared', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: createObjects(8),
            })
        );
    }),
    rest.delete(appSetting.apiUrl + '/objects/:id', (req, res, ctx) => {
        const id = req.params.id;
        const hasObject = Object.entries(objectDb).find(([path, objs]) => {
            const obj = objs.find(({ id: oid }) => oid === id);
            if (obj) {
                objectDb[path] = objs.filter(o => o.id !== id);
            }
            return obj;
        });
        return res(ctx.status(200), ctx.json({}));
    }),
    rest.post(appSetting.apiUrl + '/objects/:id', (req, res, ctx) => {
        const id = req.params.id as string;
        const updateData = req.body as Partial<
            Pick<CloudObject, 'id' | 'name' | 'path' | 'starred'>
        >;

        return res(
            ctx.status(200),
            ctx.json({ data: updateObject(id, updateData) })
        );
    }),
];

function getObjectFromDb(id: string) {
    let obj: CloudObject | undefined;

    Object.entries(objectDb).find(([path, objs]) => {
        obj = objs.find(({ id: oid }) => oid === id);
    });

    return obj;
}

function updateObject(
    id: string,
    updateProps: Partial<Pick<CloudObject, 'id' | 'name' | 'path' | 'starred'>>
) {
    let obj: CloudObject | undefined;

    Object.entries(objectDb).find(([path, objs]) => {
        obj = objs.find(({ id: oid }) => oid === id);
        if (obj) {
            objectDb[path] = objs.filter(o => o.id !== id);
            return true;
        }
    });

    if (obj) {
        obj = {
            ...obj,
            ...updateProps,
        };

        (objectDb[obj.path] = objectDb[obj.path] || []).push(obj);
    }

    return obj;
}

function createObjects(number: number): CloudObject[] {
    return Array.from({ length: number }, (v, k) => ({
        id: k,
        type: k % 2 === 0 ? 'folder' : 'file',
        name: k % 2 === 0 ? `Folder ${k}` : `file ${k}`,
        starred: k % 2 === 0,
        size: Math.floor(Math.random() * 1000) / 10,
        owner: 'me',
        updateTime: new Date().toISOString(),
        path: '',
    }));
}
