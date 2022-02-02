import markerShape from '@golfcontexts/marker-shape.json';
import golf from '@golfconstants/golf-namespace';
import parseFields from '@golfutils/parseData/parseFields';

const getMarkerField = doc => (data, label, defaultValue) => {

    let value = defaultValue;

    const markerIds = data.getAllRefs(golf.properties.gameMarker);
    const markerRef = doc.getSubject(markerIds[0]);

    value = parseFields(markerShape, doc)(markerRef);

    return ({
        label,
        value
    });
};

export default getMarkerField;
