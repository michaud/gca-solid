// import courseShape from '@contexts/course-shape.json';
// import holeShape from '@contexts/hole-shape.json';
import golf from '@utils/golf-namespace';
import { rdf } from 'rdf-namespaces';

import gameShape from '@contexts/game-shape.json';
import { addField } from '@utils/addField';

const saveGame = async (game, doc) => {

    const ref = doc.addSubject();
    ref.addRef(rdf.type, golf.classes.Game);

    gameShape.shape.forEach(field => {

        addField(field, gameShape, game.fields[field.predicate], ref, doc);
    });

    await doc.save();
};

export default saveGame;
