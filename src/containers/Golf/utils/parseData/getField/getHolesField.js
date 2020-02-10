import gameHoleShape from '@golfcontexts/game-hole-shape.json';
import holeShape from '@golfcontexts/hole-shape.json';
import golf from '@golfutils/golf-namespace';
import parseFields from '@golfutils/parseData/parseFields';

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
