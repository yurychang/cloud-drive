import { CloudObject } from '@custom-types/object';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import {
    deleteObjectApi,
    getMyObjectApi,
    GetMyObjectApiProps,
    getRecentObjectApi,
    updateObjectApi,
} from '../api';
import { useMatchMutate } from '../hooks/swr';

export const useMyObject = ({
    fetch = true,
    path,
    sortBy,
    asc,
}: GetMyObjectApiProps & { fetch?: boolean } = {}) => {
    const matchMutate = useMatchMutate();
    const { data: myObjects = [], error } = useSWR<CloudObject[]>(
        fetch && { url: 'objects', path, sortBy, asc },
        () => getMyObjectApi({ path, sortBy, asc })
    );

    return {
        myObjects,
        error,
        async deleteObject(id: string) {
            const err = await deleteObjectApi(id);
            if (!err) {
                matchMutate(/^(#url:")?objects/);
            }
        },
    };
};

export const useUpdateObject = () => {
    const matchMutate = useMatchMutate();
    return (
        id: Parameters<typeof updateObjectApi>[0],
        updateData: Parameters<typeof updateObjectApi>[1]
    ) => {
        return updateObjectApi(id, updateData).then(data => {
            if (data) {
                matchMutate(/^(#url:")?objects/);
            }
            return data;
        });
    };
};

export const useRecentObject = () => {
    const { data, error } = useSWR('objects/recent', getRecentObjectApi);

    return { recentObject: data, isLoading: !error && !data, isError: error };
};
