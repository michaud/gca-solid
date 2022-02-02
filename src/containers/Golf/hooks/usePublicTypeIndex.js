import { useState, useEffect } from 'react';

import ulog from 'ulog';

import fetchPublicTypeIndex from '@golfservices/fetchPublicTypeIndex';

const log = ulog('usePublicTypeIndex');

const usePublicTypeIndex = () => {
    
    const [reload, setReload] = useState(false);
    const [publicTypeIndex, setPublicTypeIndex] = useState({ doc: undefined });
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {

        let didCancel = false;

        const fetchData = async () => {
            
            if(!publicTypeIndex.doc || reload) {

                try {
                    const doc = await fetchPublicTypeIndex();

                    if(!didCancel) setPublicTypeIndex(state => ({
                        ...state,
                        doc
                    }));

                } catch(error) {

                    if(!didCancel) {
                        
                        log.error('error: ', error);
                        setIsError(error)
                    }

                } finally {

                    if(!didCancel) {

                        setReload(false);
                        setIsLoading(false);
                    }
                }
            }
        }

        if(!didCancel) setIsLoading(true);

        fetchData();

        return () => { didCancel = true; }

    }, [reload]);

    return [{ publicTypeIndex, isLoading, isError }, () => { setReload(true) }];
};

export default usePublicTypeIndex;
