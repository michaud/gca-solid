import geoCoorShape from '@golfcontexts/geocoordinates-shape.json';
import golf from '@golfconstants/golf-namespace';
import parseFields from '@golfutils/parseData/parseFields';

const getGeoCoordinatesField = doc => (data, label, defaultValue) => {

    let value = defaultValue;

    const coorId = data.getRef(golf.properties.strokeLocation);
    const coorRef = doc.getSubject(coorId);

    value = parseFields(geoCoorShape, doc)(coorRef);

    return ({
        label,
        value
    });
};

export default getGeoCoordinatesField;
