import { namedNode } from '@rdfjs/data-model';//, literal, quad
import * as ns from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';
import golf from '@utils/golf-namespace';

const getClubDefinitions = async () => {

    const golfVocabulary = await fetchDocument(`${ golf.root }golf.ttl`);

    const clubFields = golfVocabulary
        .findSubjects(ns.rdfs.domain, namedNode(golf.classes.Club))
        .reduce((acc, quad) => {

            const fieldName = quad.getLiteral(ns.rdfs.label);
            const fieldType = quad.getRef(ns.rdfs.range);
            const iri = quad.asRef();
            const label = quad.getLiteral(golf.properties.fieldLabel);

            let value = '';

            if(fieldName === 'ownedBy') value = 'https://michaud.inrupt.net/profile/card#me';

            acc[fieldName] = {
                fieldType,
                fieldName,
                iri,
                field: {
                    label,
                    value
                }
            };

            return acc;

        }, {});

    const clubTypes = await golfVocabulary
        .findSubjects(ns.rdfs.subClassOf, namedNode(golf.classes.Club))
        .map(value => ({
            fields: clubFields,
            label: value.getLiteral(golf.properties.fieldLabel),
            iri: value.asNodeRef()
        }));

    const clubType = {
        fields: clubFields,
        label: '',
        iri: ''
    }

    return { clubTypes, clubType };
};

export default getClubDefinitions;
