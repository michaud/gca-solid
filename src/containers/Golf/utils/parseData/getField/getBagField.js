import golf from '@golfutils/golf-namespace';

import bagShape from '@golfcontexts/bag-shape.json';
import parseFields from '@golfutils/parseData/parseFields';

const getBagField = doc => (data, label, clubTypes, clubType) => {

    const bagId = data.getAllRefs(golf.properties.gameBag)[0];
    const bagRef = doc.getSubject(bagId);

    const value = parseFields(bagShape, doc, clubTypes, clubType)(bagRef);

    return ({
        label,
        value
    });
};

export default getBagField;
