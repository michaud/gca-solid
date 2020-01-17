const setupDataObject = (objectShape, fieldValue) => {

    const obj = {
        label: "",
        iri: "",
        fields: {}
    };

    objectShape.shape.forEach(field => {

        const prefix = objectShape['@context'][field.prefix];
        const predicate = `${prefix}${field.predicate}`;

        const value = fieldValue && fieldValue.hasOwnProperty(field.predicate) ? fieldValue[field.predicate] : field.value;
        const required = field.hasOwnProperty('required') ? field.required : true;

        obj.fields[field.predicate] = {
            fieldType: field.type,
            fieldName: field.predicate,
            iri: predicate,
            required,
            label: field.label,
            value
        }
    });

    return obj;
};

export default setupDataObject;
