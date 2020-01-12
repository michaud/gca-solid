import golf from "@utils/golf-namespace";

export const setField = (field, shape, data, ref) => {

    const prefix = shape['@context'][field.prefix];
    const predicate = `${prefix}${field.predicate}`;

    switch(field.type) {

        case golf.types.text : {

            ref.setLiteral(predicate, data.field.value);

            break;
        }

        case golf.types.integer : {

            ref.setLiteral(predicate, parseInt(data.field.value));

            break;
        }

        case golf.types.string: {

            ref.setLiteral(predicate, data.fields[field.predicate].field.value);

            break;
        }

        case golf.classes.Club: {

            ref.setRef(predicate, data.fields[field.predicate].field.value.iri);
            
            break;
        }

        default : {

            console.error('no field defined', field);

            break;
        }
    }
};
