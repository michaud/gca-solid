import { rdf } from 'rdf-namespaces';
import { addField } from '@utils/addField';
import { setField } from '@utils/setField';
import shapeFromType from '@utils/shapeFromType';

const saveResource = async ({ resource, element, doc, type }) => {
    
    const isNew = resource.iri === '';
    const ref = isNew ? doc.addSubject() : doc.getSubject(resource.iri);
    const fieldAction = isNew ? addField : setField;

    if(isNew) ref.addRef(rdf.type, type);
    
    const resourceShape = shapeFromType[type];

    resourceShape.shape.forEach(field => {

        fieldAction(field, resourceShape, resource[field.predicate], ref, doc);
    });

    return await doc.save();
};

export default saveResource;
