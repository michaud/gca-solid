import markerShape from '@contexts/marker-shape.json';
import golf from '@utils/golf-namespace';
import { rdf } from 'rdf-namespaces';
import { addField } from '@utils/addField';
import { setField } from '@utils/setField';

const saveMarker = async (marker, doc) => {
    
    const isNewMarker = marker.iri === '';
    const markerRef = isNewMarker ? doc.addSubject() : doc.getSubjectsOfType(golf.classes.Player)[0];
    const fieldAction = isNewMarker ? addField : setField;

    if(isNewMarker) markerRef.addRef(rdf.type, golf.classes.Marker);
    
    markerShape.shape.forEach(field => {

        fieldAction(field, markerShape, marker.fields[field.predicate], markerRef);
    });

    return await doc.save();
};

export default saveMarker;
