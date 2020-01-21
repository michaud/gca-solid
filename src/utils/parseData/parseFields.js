import getFieldData from "./getFieldData";

const parseFields = (dataShape, doc, ...rest) => item => {
            
    const fieldData = dataShape.shape.reduce((acc, field) => {
        
        const data = getFieldData(dataShape, doc, item, ...rest)(field);
        const newAcc = {
            ...acc,
            [field.predicate]: data
        }
        
        return newAcc;
        
    }, {});

    const newItem = {
        ...fieldData,
        iri: item ? item.asNodeRef() : ''
    };

    return newItem;
}

export default parseFields;
