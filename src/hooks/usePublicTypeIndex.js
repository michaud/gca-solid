import { useState, useEffect } from 'react';
import fetchPublicTypeIndex from '@services/fetchPublicTypeIndex';

const usePublicTypeIndex = (reload) => {
    
    const [publicTypeIndex, setPublicTypeIndex] = useState();

    useEffect(() => {

        if(!publicTypeIndex || reload) {

            fetchPublicTypeIndex().then(fetchedPublicTypeIndex => {

                if (fetchedPublicTypeIndex === null) {
                    return;
                }

                setPublicTypeIndex(fetchedPublicTypeIndex);
            });
        }

    }, [reload]);

    return publicTypeIndex;
}

export default usePublicTypeIndex;
