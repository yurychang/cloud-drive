import useSWR from 'swr';
import { getMyObjectApi } from '../api';

export const useMyObject = () => {
    const { data, error } = useSWR('/object/my', getMyObjectApi);

    return { myObject: data, isLoading: !error && !data, isError: error };
};
