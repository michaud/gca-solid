import { rdf } from 'rdf-namespaces';
import shapeFromType from '@utils/shapeFromType';
import { addField } from '@utils/parseData/addField';
import { setField } from '@utils/parseData/setField';

const saveResource = ({
    resource,
    element,
    doc,
    type
}) => {

    const data = resource ? resource : element;
    const isNew = data.iri === '';
    const ref = isNew ? doc.addSubject() : doc.getSubject(data.iri);
    const fieldAction = isNew ? addField : setField;

    if(isNew) ref.addRef(rdf.type, type);
    
    const resourceShape = shapeFromType[type];

    resourceShape.shape.forEach(field => {

        fieldAction({
            field,
            shape: resourceShape,
            data: data[field.predicate],
            element,
            ref,
            doc
        });
    });

    if(resource) doc.save();

    return ref;
};

export default saveResource;
