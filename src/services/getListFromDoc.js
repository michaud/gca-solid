import { namedNode } from '@rdfjs/data-model';//, literal, quad
import * as ns from 'rdf-namespaces';
import parseFields from '@utils/parseData/parseFields';
import golf from '@utils/golf-namespace';

const getListFromDoc = (doc,  type, shape, ...rest) => (gameId) => {

    if(gameId) {

        const [clubTypes, clubType] = rest;

        const gameRef = doc.getSubject(`https://michaud.inrupt.net/public/golf/data/games.ttl#${ gameId }`, golf.classes.Game);
        const game = parseFields(shape, doc, clubTypes, clubType)(gameRef);
        return [game];
    }

    const list = doc
        .findSubjects(ns.rdf.type, namedNode(type))
        .map(parseFields(shape, doc, ...rest));

    return list;
};

export default getListFromDoc;
