import useSWR from 'swr';
import { getMyObjectApi, GetMyObjectApiProps } from '../api';

export const useMyObject = (params: GetMyObjectApiProps = {}) => {
    const { data, error } = useSWR({ url: '/object', ...params }, () =>
        getMyObjectApi(params)
    );

    return { myObject: data, isLoading: !error && !data, isError: error };
};
