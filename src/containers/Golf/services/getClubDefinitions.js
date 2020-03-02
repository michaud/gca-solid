import { namedNode } from '@rdfjs/data-model';
import * as ns from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';

import golf from '@golfutils/golf-namespace';

const getClubDefinitions = async () => {

    const golfVocabulary = await fetchDocument(`${ golf.root }golf.ttl`);

    const clubFields = golfVocabulary
        .findSubjects(ns.rdfs.domain, namedNode(golf.classes.Club))
        .reduce((acc, ref) => {

            const predicate = ref.getLiteral(ns.rdfs.label);
            const type = ref.getRef(ns.rdfs.range);
            const iri = ref.asRef();
            const label = ref.getLiteral(golf.properties.fieldLabel);

            const value = '';

            acc[predicate] = {
                type,
                predicate,
                iri,
                label,
                value
            };

            return acc;

        }, {});

    const clubTypes = await golfVocabulary
        .findSubjects(ns.rdfs.subClassOf, namedNode(golf.classes.Club))
        .map(value => ({
            label: value.getLiteral(golf.properties.fieldLabel),
            iri: value.asNodeRef()
        }));

    const clubType = {
        ...clubFields,
        label: '',
        iri: ''
    }

    return { clubTypes, clubType, doc: golfVocabulary };
};

export default getClubDefinitions;
