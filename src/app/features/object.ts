import { CloudObject } from '@custom-types/object';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
    deleteObjectApi,
    getMyObjectApi,
    GetMyObjectApiProps,
    getRecentObjectApi,
} from '../api';

export const useMyObject = ({
    path,
    sortBy,
    asc,
}: GetMyObjectApiProps = {}) => {
    const [objects, setObjects] = useState<CloudObject[]>([]);

    useEffect(() => {
        getMyObjectApi({ path, sortBy, asc }).then((data) => setObjects(data));
    }, [path, sortBy, asc]);

    return {
        myObject: objects,
        async deleteObject(id: string) {
            const err = await deleteObjectApi(id);
            if (!err) {
                getMyObjectApi({ path, sortBy, asc }).then((data) =>
                    setObjects(data)
                );
            }
        },
    };
};

export const useRecentObject = () => {
    const { data, error } = useSWR('/object/recent', getRecentObjectApi);

    return { recentObject: data, isLoading: !error && !data, isError: error };
};
