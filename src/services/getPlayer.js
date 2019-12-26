import { namedNode } from '@rdfjs/data-model';//, literal, quad
import * as ns from 'rdf-namespaces';

import playerShape from '@contexts/player-shape.json';
import parseFields from '@utils/parseFields';

const getPlayer = (doc, type) => {

    const player = doc ? doc
    .findSubject(ns.rdf.type, namedNode(type))
    : undefined;

    const newPlayer = parseFields(playerShape, doc)(player);

    return newPlayer;
};

export default getPlayer;
