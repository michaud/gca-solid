import golf from "./golf-namespace";

const getFieldDisplayData = (field, data) => {

    const {
        label,
        type,
        predicate
    } = field;

    const { fields } = data;

    let value = '';

    switch(type) {

        case golf.types.text: {

            value = fields[predicate].field.value;

            break;
        }
        
        case golf.types.string: {

            value = fields[predicate].field.value;

            break;
        }

        case golf.types.integer: {

            value = fields[predicate].field.value;

            break;
        }

        case golf.types.nonNegativeInteger: {

            value = fields[predicate].field.value;

            break;
        }

        default: {
            value = 'error';
            console.error('no field type', field, data)
        }
    }
    
    return { value, label };
};

export default getFieldDisplayData;
