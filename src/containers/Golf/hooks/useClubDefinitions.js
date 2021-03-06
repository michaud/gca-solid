import { useState, useEffect } from "react";

import ulog from 'ulog';

import getClubDefinitions from "@golfservices/getClubDefinitions";

const log = ulog('useClubDefinitions');

const useClubDefinitions = () => {

    const [clubDefinitions, setClubDefinitions] = useState({ clubTypes: [], clubType: undefined, doc: undefined });
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        
        let didCancel = false;

        if(clubDefinitions.clubTypes.length === 0 && clubDefinitions.clubType === undefined ) {

            try {
                (async () => {

                    if(!didCancel) setIsLoading(true);

                    const clubTypeData = await getClubDefinitions();

                    if(!didCancel) {

                        setClubDefinitions(state => ({
                            ...state,
                            ...clubTypeData
                        }));
                    }

                })();

            } catch(error) {

                if(!didCancel) {

                    log.error('error: ', error);
                    setIsError(error);
                }

            } finally {

                if(!didCancel) setIsLoading(false);
            }
        }

        return () => { didCancel = true }

    }, [clubDefinitions.clubTypes, clubDefinitions.clubType])

    return [{ clubDefinitions, isLoading, isError }];
};

export default useClubDefinitions;
