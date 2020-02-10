import clubShape from '@golfcontexts/club-shape.json';
import golf from '@golfutils/golf-namespace';
import parseFields from '@golfutils/parseData/parseFields';

const getStrokeClubField = doc => (data, label, clubTypes, clubType) => {

    let value = undefined;

    const strokeClubIds = data.getAllRefs(golf.properties.strokeClub);
    const strokeClubRef = doc.getSubject(strokeClubIds[0]);

    if(strokeClubRef.getTriples().length > 0) {
        
        value = parseFields(clubShape, doc, clubTypes, clubType)(strokeClubRef);
    }

    return ({
        label,
        value
    });
};

export default getStrokeClubField;
