import { rest } from 'msw';
import { CloudObject } from '@custom-types/object';
import { appSetting } from 'src/app/appSetting';

const myObjectList: CloudObject[] = Array.from({ length: 12 }, (v, k) => ({
    id: k,
    type: k % 2 === 0 ? 'folder' : 'file',
    name: k % 2 === 0 ? `Folder ${k}` : `file ${k}`,
    starred: k % 2 === 0,
    size: Math.floor(Math.random() * 1000) / 10,
    owner: 'me',
    updateTime: new Date().toISOString(),
    path: '',
}));

export default [
    rest.get(appSetting.apiUrl + '/objects', (req, res, ctx) => {
        const path = req.url.searchParams.get('path') || '/';

        return res(
            ctx.status(200),
            ctx.json({
                data: myObjectList.map((object) => ({
                    ...object,
                    path: path,
                })),
            })
        );
    }),
    rest.get(appSetting.apiUrl + '/objects/recent', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: myObjectList,
            })
        );
    }),
    rest.get(appSetting.apiUrl + '/objects/shared', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: myObjectList,
            })
        );
    }),
];
