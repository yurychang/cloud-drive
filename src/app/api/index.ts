import axios from 'axios';
import { appSetting } from '../appSetting';
import { CloudObject } from '@custom-types/object';

const ObjectRequest = axios.create({
    baseURL: appSetting.apiUrl + '/objects',
});

export interface GetMyObjectApiProps {
    path?: string;
    sortBy?: string;
    asc?: boolean;
}

export const getMyObjectApi = ({ path, sortBy, asc }: GetMyObjectApiProps) =>
    ObjectRequest.get<{ data: CloudObject[] }>('', {
        params: {
            path,
            sortBy,
            asc,
        },
    }).then((res) => res.data.data);

export const getRecentObjectApi = () =>
    ObjectRequest.get<{ data: CloudObject[] }>('recent').then(
        (res) => res.data.data
    );

export const deleteObjectApi = (id: string) =>
    ObjectRequest.delete(`${id}`).then((res) => res.data.error);
