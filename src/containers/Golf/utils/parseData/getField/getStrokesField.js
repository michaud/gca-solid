import strokeShape from '@golfcontexts/stroke-shape.json';
import golf from '@golfutils/golf-namespace';
import parseFields from '@golfutils/parseData/parseFields';

const getStrokesField = doc => (data, label, defaultValue, clubTypes, clubType) => {

    const ids = data.getAllRefs(golf.properties.gameStrokes);

    if(ids.length === 1 && ids[0] === golf.types.undefined) {

        return ({
            label,
            value: []
        })
    }

    const strokeRefs = ids.map(id => doc.getSubject(id));
    const parse = parseFields(strokeShape, doc, clubTypes, clubType);

    const value = strokeRefs.map(stroke => parse(stroke));

    return ({
        label,
        value
    });
};
    
export default getStrokesField;
