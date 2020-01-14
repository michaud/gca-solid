import gameShape from '@contexts/game-shape.json';
import golf from '@utils/golf-namespace';
import { rdf } from 'rdf-namespaces';
import { addField } from '@utils/addField';
import { setField } from '@utils/setField';

const saveGame = async (game, doc) => {
    
    const isNewGame = game.iri === '';
    const gameRef = isNewGame ? doc.addSubject() : doc.getSubject(game.iri);
    const fieldAction = isNewGame ? addField : setField;

    if(isNewGame) gameRef.addRef(rdf.type, golf.classes.Game);
    
    gameShape.shape.forEach(field => {

        fieldAction(field, gameShape, game.fields[field.predicate], gameRef, doc);
    });

    return await doc.save();
};

export default saveGame;
