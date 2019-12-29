import { rdf } from "rdf-namespaces";
import golf from "@utils/golf-namespace";

const addField = (field, ref) => {

    switch(field.fieldType) {

        case golf.types.text : {

            ref.addLiteral(field.iri, field.field.value);

            break;
        }

        case golf.types.integer : {

            ref.addLiteral(field.iri, parseInt(field.field.value));

            break;
        }

        default : {

            console.error('no field defined', field);

            break;
        }
    }
};

const saveField = (field, ref) => {

    switch(field.fieldType) {

        case golf.types.text : {

            ref.setLiteral(field.iri, field.field.value);

            break;
        }

        case golf.types.integer : {

            ref.setLiteral(field.iri, parseInt(field.field.value));

            break;
        }

        default : {

            console.error('no field defined', field);

            break;
        }
    }
};

const savePlayer = async (player, doc) => {

    if(!player.iri) {

        const newPlayer = doc.addSubject();
        newPlayer.addRef(rdf.type, golf.classes.Player);

        for(const field in player.fields) {

            addField(player.fields[field], newPlayer, doc);
        }

    } else {

        const curPlayer = doc.getSubjectsOfType(golf.classes.Player)[0];

        for(const field in player.fields) {

            saveField(player.fields[field], curPlayer, doc);
        }
    }

    await doc.save();
};

export default savePlayer;
