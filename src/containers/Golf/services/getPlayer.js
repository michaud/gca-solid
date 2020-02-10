import { namedNode } from '@rdfjs/data-model';
import * as ns from 'rdf-namespaces';

import playerShape from '@golfcontexts/player-shape.json';
import parseFields from '@golfutils/parseData/parseFields';

const getPlayer = (doc, type) => {

    const player = doc ? doc
        .findSubject(ns.rdf.type, namedNode(type))
        : undefined;

    const newPlayer = parseFields(playerShape, doc)(player);

    return newPlayer;
};

export default getPlayer;
