import { namedNode } from '@rdfjs/data-model';//, literal, quad
import * as ns from 'rdf-namespaces';

import parseFields from '@utils/parseFields';

const getListFromDoc = (doc, type, shape, ...rest) => {

    const list = doc
        .findSubjects(ns.rdf.type, namedNode(type))
        .map(parseFields(shape, doc, ...rest));

    return list;
};

export default getListFromDoc;
