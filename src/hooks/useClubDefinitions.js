import { useState, useEffect } from "react";
import getClubDefinitions from "@services/getClubDefinitions";

const useClubDefinitions = () => {

    const [clubDefinitions, setClubDefinitions] = useState({ clubTypes: [], clubType: undefined });

    useEffect(() => {
        
        if(clubDefinitions.clubTypes.length === 0 & clubDefinitions.clubType === undefined ) {

            (async () => {

                const clubTypeData = await getClubDefinitions();

                setClubDefinitions(clubTypeData);
            })();
        }
    })

    return clubDefinitions;
};

export default useClubDefinitions;
