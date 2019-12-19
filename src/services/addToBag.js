import golf from "@utils/golf-namespace";

const addToBag = (clubs, doc) => {

    clubs.forEach(club => {

        const ref = `${ golf.properties.clubs }#${ club.iri.split('#')[1] }`;
        const bag = doc.getSubjectsOfType(golf.classes.Bag)[0];
        bag.addRef(golf.properties.clubs, ref);
    });

    return doc.save();
};

export default addToBag;
