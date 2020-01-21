import golf from '@utils/golf-namespace';

import bagShape from '@contexts/bag-shape.json';
import parseFields from '@utils/parseData/parseFields';

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
