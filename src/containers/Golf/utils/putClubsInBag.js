import golf from "@golfconstants/golf-namespace";

export const putClubsInBag = (clubs, bag) => {

    const value = bag.reduce((acc, clubRef) => {

        const club = clubs.find(clubTest => clubTest.iri.includes(clubRef.ref));

        if(club) acc.push(club);

        return acc;

    }, []);

    return {
        clubs: {
            type: golf.classes.Club,
            predicate:"clubs",
            iri:golf.properties.clubs,
            label:"clubs",
            value
        }
    };
};
