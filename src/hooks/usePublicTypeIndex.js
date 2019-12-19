import { useState, useEffect } from 'react';
import fetchPublicTypeIndex from '@services/fetchPublicTypeIndex';

const usePublicTypeIndex = () => {

    const [publicTypeIndex, setPublicTypeIndex] = useState();

    useEffect(() => {

        fetchPublicTypeIndex().then(fetchedPublicTypeIndex => {

            if (fetchedPublicTypeIndex === null) {
                return;
            }

            setPublicTypeIndex(fetchedPublicTypeIndex);
        });
    }, []);

    return publicTypeIndex;
}

export default usePublicTypeIndex;
