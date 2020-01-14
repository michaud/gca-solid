import { rdf } from "rdf-namespaces";
import golf from "@utils/golf-namespace";
import playerShape from '@contexts/player-shape.json';
import { addField } from "@utils/addField";
import { setField } from "@utils/setField";

const savePlayer = async (player, doc) => {

    const isNewPLayer = player.iri === '';
    const playerRef = isNewPLayer ? doc.addSubject() : doc.getSubject(player.iri);
    const fieldAction = isNewPLayer ? addField : setField;

    if(isNewPLayer) playerRef.addRef(rdf.type, golf.classes.Player);
    
    playerShape.shape.forEach(field => {

        fieldAction(field, playerShape, player.fields[field.predicate], playerRef);
    });

    return await doc.save();
};

export default savePlayer;
