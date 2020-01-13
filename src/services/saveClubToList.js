import { rdf } from "rdf-namespaces";
import golf from "@utils/golf-namespace";

import { addField } from "@utils/addField";
import { setField } from "@utils/setField";

import clubShape from '@contexts/club-shape.json';

const saveClubToList = async (club, doc) => {

    const isNewPClub = club.iri === '';

    const clubRef = isNewPClub ? doc.addSubject() : doc.getSubject(club.iri);
    const fieldAction = isNewPClub ? addField : setField;

    if(isNewPClub) clubRef.addRef(rdf.type, golf.classes.Club);

    clubShape.shape.forEach(field => {

        fieldAction(field, clubShape, club.fields[field.predicate], clubRef, doc);
    });

    const newClubList = await doc.save([clubRef]);

    return newClubList;
};

export default saveClubToList;
