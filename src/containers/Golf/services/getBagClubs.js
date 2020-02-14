import golf from '@golfutils/golf-namespace';

const getBagClubs = async (doc) => {

    const bags = doc.getSubjectsOfType(golf.classes.Bag);
    const clubRefs = bags[0].getAllRefs(golf.properties.clubs);

    const list = clubRefs.map(club => ({
        ref: club.split('#')[1]
    }))
    
    return list;
};

export default getBagClubs;
