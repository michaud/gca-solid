import { namedNode } from '@rdfjs/data-model';
import { rdf } from 'rdf-namespaces';

import parseFields from '@golfutils/parseData/parseFields';

const getListFromDoc = (doc,  type, shape, ...rest) => {

    const subjects = doc.findSubjects(rdf.type, namedNode(type));
    const list = subjects.map(parseFields(shape, doc, ...rest));

    return list;
};

export default getListFromDoc;
