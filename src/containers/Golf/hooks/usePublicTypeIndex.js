import { useState, useEffect } from 'react';

import fetchPublicTypeIndex from '@services/fetchPublicTypeIndex';

const usePublicTypeIndex = (initialReload) => {
    
    const [reload, setReload] = useState(initialReload);
    const [publicTypeIndex, setPublicTypeIndex] = useState({ doc: undefined });
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {

        let didCancel = false;

        const fetchData = async () => {

            if(!publicTypeIndex.doc || reload) {

                if(!didCancel) setIsError(false);
                if(!didCancel) setIsLoading(true);

                try {
                    const doc = await fetchPublicTypeIndex();

                    if(!didCancel) setPublicTypeIndex(state => ({
                        ...state,
                        doc
                    }));

                    if(!didCancel) setIsLoading(false);

                } catch(error) {

                    if(!didCancel) {
                        
                        console.log('error: ', error);
                        setIsError(error)
                        setReload(false);
                        setIsLoading(true);
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
