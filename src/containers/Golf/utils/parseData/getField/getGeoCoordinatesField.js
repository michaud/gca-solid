import geoCoorShape from '@golfcontexts/geocoordinates-shape.json';
import golf from '@golfutils/golf-namespace';
import parseFields from '@golfutils/parseData/parseFields';

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
