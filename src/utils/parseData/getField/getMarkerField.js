import golf from '@utils/golf-namespace';

import markerShape from '@contexts/marker-shape.json';
import parseFields from '@utils/parseData/parseFields';

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
