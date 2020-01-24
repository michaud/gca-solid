import golf from '@utils/golf-namespace';

import clubShape from '@contexts/club-shape.json';
import parseFields from '@utils/parseData/parseFields';

const getClubsField = doc => (data, label, clubTypes, clubType) => {

    const clubIds = data.getAllRefs(golf.properties.clubs);
    const clubRefs = clubIds.map(id => doc.getSubject(id));
    const parse = parseFields(clubShape, doc, clubTypes, clubType);

    const value = clubRefs.map(club => parse(club));

    return ({
        label,
        value
    });
};

export default getClubsField;
