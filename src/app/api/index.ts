import axios from 'axios';
import { appSetting } from '../appSetting';
import { CloudObject } from '@custom-types/object';

const ObjectRequest = axios.create({
    baseURL: appSetting.apiUrl + '/objects',
});

export const getMyObjectApi = () =>
    ObjectRequest.get<{ data: CloudObject[] }>('/my').then(
        (res) => res.data.data
    );
