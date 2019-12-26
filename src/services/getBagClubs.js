import golf from '@utils/golf-namespace';

const getBagClubs = async (doc) => {

    const quads = doc.getTriples();
    const clubRefs = quads.filter(item => item.predicate.value === golf.properties.clubs);

    const list = clubRefs.map(club => ({
        ref: club.object.value.split('#')[1]
    }))
    
    return list;
};

export default getBagClubs;
