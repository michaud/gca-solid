import golf from "@utils/golf-namespace";

export const setField = ({ field, shape, data, element, ref, doc }) => {

    const prefix = shape['@context'][field.prefix];
    const predicate = `${prefix}${field.predicate}`;

    switch(field.type) {

        case golf.types.text : {

            ref.setLiteral(predicate, data.value);

            break;
        }

        case golf.types.integer : {

            ref.setLiteral(predicate, parseInt(data.value));

            break;
        }

        case golf.types.string: {

            ref.setLiteral(predicate, data.value);
            //ref.setLiteral(predicate, data[field.predicate].value);

            break;
        }

        case golf.types.nonNegativeInteger : {

            const value = data === undefined ? field.value : data.value;

            ref.setLiteral(predicate, parseInt(value));

            break;
        }

        case golf.classes.Club: {

            ref.setRef(predicate, data.value.iri);
            
            break;
        }

        case golf.classes.Stroke: {

            const value = data === undefined ? field.value : data.value;

            ref.setRef(predicate, value);
            
            break;
        }

        default : {

            console.error('setField: no field defined', field);

            break;
        }
    }
};
