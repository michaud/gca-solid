import { rdf } from 'rdf-namespaces';

import shapeFromType from '@golfutils/shapeFromType';
import { addField } from '@golfutils/parseData/addField';
import { setField } from '@golfutils/parseData/setField';

const saveReferenceData = ({
    data: referenceData,
    doc,
    type
}) => {
    const isNew = referenceData.iri === '';
    const ref = isNew ? doc.addSubject() : doc.getSubject(referenceData.iri);
    const fieldAction = isNew ? addField : setField;

    if(isNew) ref.addRef(rdf.type, type);

    const elementShape = shapeFromType[type];

    elementShape.shape.forEach(field => {

        fieldAction({
            field,
            shape: elementShape,
            data: referenceData[field.predicate],
            element: referenceData,
            ref,
            doc
        });
    });

    return ref;
};

export default saveReferenceData;
