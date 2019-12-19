import clubShape from '@contexts/club-shape.json';
import golf from '@utils/golf-namespace';

const saveClub = async (club, doc) => {

    const clubData = doc.getSubject(club.iri);

    clubShape.shape.forEach(field => {

        const prefix = clubShape['@context'][field.prefix];
        const predicate = `${prefix}${field.predicate}`;

        switch(field.type) {

            case golf.types.string: {

                clubData.setLiteral(predicate, club.fields[field.predicate].field.value);

                break;
            }

            case golf.classes.Club: {

                clubData.setRef(predicate, club.fields[field.predicate].field.value.iri);
                
                break;
            }
    
            default: {
                console.error('wrong field')
            }
        }
    });

    await doc.save();
};

export default saveClub;
