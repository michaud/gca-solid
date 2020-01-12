import clubShape from '@contexts/club-shape.json';
import golf from '@utils/golf-namespace';

export const setClubFields = (club, doc) => {

    clubShape.shape.forEach(field => {

        const prefix = clubShape['@context'][field.prefix];
        const predicate = `${prefix}${field.predicate}`;

        switch(field.type) {

            case golf.types.string: {

                doc.setLiteral(predicate, club.fields[field.predicate].field.value);

                break;
            }

            case golf.classes.Club: {

                doc.setRef(predicate, club.fields[field.predicate].field.value.iri);
                
                break;
            }
    
            case golf.classes.Owner: {

                doc.setRef(predicate, club.fields[field.predicate].field.value.iri);
                
                break;
            }

            default: {
                console.error('unhandled field', field.predicate)
            }
        }
    });
};

const saveClub = async (club, doc) => {

    const clubDoc = doc.getSubject(club.iri);

    setClubFields(club, clubDoc);

    await doc.save();
};

export default saveClub;
