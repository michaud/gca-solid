import golf from "./golf-namespace";

export const putClubsInBag = (clubs, bag) => {

    const value = bag.reduce((acc, clubRef) => {

        const club = clubs.find(clubTest => clubTest.iri.includes(clubRef.ref));

        if(club) acc.push(club);

        return acc;

    }, []);

    return {
        fields: {
            clubs: {
                fieldType: golf.classes.Club,
                fieldName:"clubs",
                iri:golf.properties.clubs,
                field:{
                    label:"clubs",
                    value
                }
            }
        }
    };
};
