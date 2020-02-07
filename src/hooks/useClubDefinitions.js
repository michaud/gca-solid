import { useState, useEffect } from "react";
import getClubDefinitions from "@services/getClubDefinitions";

const useClubDefinitions = () => {

    const [clubDefinitions, setClubDefinitions] = useState({ clubTypes: [], clubType: undefined });

    useEffect(() => {
        
        let didCancel = false;

        if(clubDefinitions.clubTypes.length === 0 && clubDefinitions.clubType === undefined ) {

            (async () => {

                const clubTypeData = await getClubDefinitions();

                if(!didCancel) setClubDefinitions(clubTypeData);
            })();
        }

        return () => { didCancel = true }

    }, [clubDefinitions.clubTypes, clubDefinitions.clubType])

    return clubDefinitions;
};

export default useClubDefinitions;
