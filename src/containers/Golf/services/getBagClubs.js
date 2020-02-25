import * as ns from 'rdf-namespaces';
import { namedNode } from '@rdfjs/data-model';
import parseFields from '@golfutils/parseData/parseFields';
import bagShape from '@golfcontexts/bag-shape.json';

const getBagClubs = (doc, clubTypes, clubType, type, clubListData) => {

    const bag = doc ? doc
    .findSubject(ns.rdf.type, namedNode(type))
    : undefined;
    
    const bagData = parseFields(bagShape, doc, clubTypes, clubType, clubListData)(bag);

    return bagData;
};

export default getBagClubs;
