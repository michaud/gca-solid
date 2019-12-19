const setupDataObject = (objectShape) => {

    const obj = {
        "label": "",
        "iri": "",
        fields: {}
    };

    objectShape.shape.forEach(field => {

        const prefix = objectShape['@context'][field.prefix];
        const predicate = `${prefix}${field.predicate}`;
    
        obj.fields[field.predicate] = {
            fieldType: field.type,
            fieldName: field.predicate,
            iri: predicate,
            field: {
                label: field.label,
                value: field.value
            }
        }
    });

    return obj;
};

export default setupDataObject;
