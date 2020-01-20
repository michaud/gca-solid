import golf from "@utils/golf-namespace";
import saveResource from "@services/saveResource";

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

        case golf.types.double : {
            //TODO flesh out the complete shape of the geocoordinate fields in setupobject i think
            ref.setLiteral(predicate, data);

            break;
        }

        case golf.types.string: {

            ref.setLiteral(predicate, data.value);

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

            if(predicate === golf.properties.gameStrokes) {

                const value = data === undefined ? field.value : data.value;

                value.forEach(stroke => {

                    if(stroke.iri === '') {

                        const elRef = saveResource({
                            element: stroke,
                            doc,
                            type: field.type
                        })
                        ref.addRef(golf.properties.gameStrokes, elRef.asRef());
                    }
                });
            }
            
            break;
        }

        default : {

            console.error('setField: no field defined', field);

            break;
        }
    }
};
