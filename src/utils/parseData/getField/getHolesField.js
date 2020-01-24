import golf from '@utils/golf-namespace';

import gameHoleShape from '@contexts/game-hole-shape.json';
import holeShape from '@contexts/hole-shape.json';
import parseFields from '@utils/parseData/parseFields';

const getHolesField = doc => (data, label, defaultValue, parentField, clubTypes, clubType) => {

    let value = defaultValue;

    if(data) {

        const shape = parentField && parentField === golf.properties.gameCourse ? gameHoleShape : holeShape;
        const holeIds = data.getAllRefs(golf.properties.courseHoles);
        const holeRefs = holeIds.map(id => doc.getSubject(id));
        const holes = holeRefs.map(parseFields(shape, doc, clubTypes, clubType))
            .sort((a,b) => a.holeNumber.value - b.holeNumber.value);
        value = holes;
    }

    return ({
        label,
        value
    }) ;
};

export default getHolesField;
