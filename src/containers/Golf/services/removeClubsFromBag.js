import golf from "@golfconstants/golf-namespace";

const removeClubsFromBag = (clubs, doc) => {

    clubs.forEach(club => {
        const ref = `${ golf.properties.clubs }#${ club.iri.split('#')[1]}`;
        const bag = doc.getSubjectsOfType(golf.classes.Bag)[0];
        bag.removeRef(golf.properties.clubs, ref);
    });

    return doc.save();
};

export default removeClubsFromBag;
