import { useState, useEffect } from 'react';

import fetchPublicTypeIndex from '@services/fetchPublicTypeIndex';

const usePublicTypeIndex = (initialReload) => {
    
    const [reload, setReload] = useState(initialReload);
    const [publicTypeIndex, setPublicTypeIndex] = useState();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {

        let didCancel = false;

        const fetchData = async () => {

            if(!publicTypeIndex || reload) {

                if(!didCancel) setIsError(false);
                if(!didCancel) setIsLoading(true);

                try {
                    const result = await fetchPublicTypeIndex();

                    if(!didCancel) setPublicTypeIndex(result);

                } catch(error) {

                    if(!didCancel) {
                        
                        console.log('error: ', error);
                        setIsError(true)
                        setReload(false);
                    }
                }
            }
        }

        fetchData();

        return () => { didCancel = true; }

    }, [reload]);

    return [{ publicTypeIndex, isLoading, isError }, setReload];
};

export default usePublicTypeIndex;
