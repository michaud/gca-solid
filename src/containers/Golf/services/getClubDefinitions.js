import { namedNode } from '@rdfjs/data-model';
import { rdfs } from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';

import golf from '@golfconstants/golf-namespace';

const getClubDefinitions = async () => {

    const golfVocabulary = await fetchDocument(`${ golf.root }golf.ttl`);

    const clubFields = golfVocabulary
        .findSubjects(rdfs.domain, namedNode(golf.classes.Club))
        .reduce((acc, ref) => {

            const predicate = ref.getLiteral(rdfs.label);
            const type = ref.getRef(rdfs.range);
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
        .findSubjects(rdfs.subClassOf, namedNode(golf.classes.Club))
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
