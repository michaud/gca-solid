import { fetchDocument } from 'tripledoc';

import golf from '@utils/golf-namespace';

const getBagClubList = async (clubListUrl, clubType, clubTypes) => {

    const doc = await fetchDocument(clubListUrl);

    const quads = doc.getTriples();
    const clubRefs = quads.filter(item => item.predicate.value === golf.properties.clubs);

    const list = clubRefs.map(club => ({
        ref: club.object.value.split('#')[1]
    }))
    
    return { list, doc };
};

export default getBagClubList;
