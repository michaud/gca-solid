import { useState, useEffect } from "react";
import getClubDefinitions from "@services/getClubDefinitions";

const useClubDefinitions = () => {

    const [clubDefinitions, setClubDefinitions] = useState();

    useEffect(() => {
        
        if(!clubDefinitions) {

            (async () => {

                const clubTypeData = await getClubDefinitions();

                setClubDefinitions(clubTypeData);
            })();
        }
    })

    return clubDefinitions;
};

export default useClubDefinitions;
