import useSWR from 'swr';
import {
    getMyObjectApi,
    GetMyObjectApiProps,
    getRecentObjectApi,
} from '../api';

export const useMyObject = (params: GetMyObjectApiProps = {}) => {
    const { data, error } = useSWR({ url: '/object', ...params }, () =>
        getMyObjectApi(params)
    );

    return { myObject: data, isLoading: !error && !data, isError: error };
};

export const useRecentObject = () => {
    const { data, error } = useSWR('/object/recent', getRecentObjectApi);

    return { recentObject: data, isLoading: !error && !data, isError: error };
};
