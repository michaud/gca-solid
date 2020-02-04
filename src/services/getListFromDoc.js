import { namedNode } from '@rdfjs/data-model';//, literal, quad
import * as ns from 'rdf-namespaces';
import parseFields from '@utils/parseData/parseFields';
import golf from '@utils/golf-namespace';

const getListFromDoc = (doc,  type, shape, ...rest) => (gameId, url) => {


    if(gameId && url) {

        const [clubTypes, clubType] = rest;

        const gameRef = doc.getSubject(`${ url }#${ gameId }`, golf.classes.Game);
        const game = parseFields(shape, doc, clubTypes, clubType)(gameRef);
        return [game];
    }

    const subjects = doc.findSubjects(ns.rdf.type, namedNode(type));
    const list = subjects.map(parseFields(shape, doc, ...rest));

    return list;
};

export default getListFromDoc;
