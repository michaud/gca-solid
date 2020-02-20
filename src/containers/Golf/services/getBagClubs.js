import * as ns from 'rdf-namespaces';
import { namedNode } from '@rdfjs/data-model';
import parseFields from '@golfutils/parseData/parseFields';
import bagShape from '@golfcontexts/bag-shape.json';

const getBagClubs = (doc, clubTypes, clubType, clubListData, type) => {

    const bag = doc ? doc
        .findSubject(ns.rdf.type, namedNode(type))
        : undefined;

    const bagData = parseFields(bagShape, doc, clubTypes, clubType, clubListData)(bag);

    return bagData;
};
// (doc) => {

//     const bag = doc.getSubjectsOfType(golf.classes.Bag)[0];
//     const clubRefs = bag.getAllRefs(golf.properties.clubs);

//     const list = clubRefs.map(club => ({
//         ref: club.split('#')[1]
//     }))
    
//     return list;
// };

export default getBagClubs;
