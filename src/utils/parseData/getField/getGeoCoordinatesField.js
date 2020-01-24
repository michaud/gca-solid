import golf from '@utils/golf-namespace';

import geoCoorShape from '@contexts/geocoordinates-shape.json';
import parseFields from '@utils/parseData/parseFields';

const getGeoCoordinatesField = doc => (data, label, defaultValue) => {

    let value = defaultValue;

    const coorIds = data.getAllRefs(golf.types.GeoCoordinates);
    const coorRef = doc.getSubject(coorIds[0]);

    value = parseFields(geoCoorShape, doc)(coorRef);

    return ({
        label,
        value
    });
};

export default getGeoCoordinatesField;
