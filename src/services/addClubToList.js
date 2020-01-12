import { rdf } from 'rdf-namespaces';
import golf from '@utils/golf-namespace';

const addField = (field, doc) => {

    switch(field.fieldType) {

        case golf.types.string : {

            doc.addLiteral(field.iri, field.field.value);

            break;
        }

        case golf.classes.Club: {

            if(field.iri === golf.properties.clubType) {
            
                doc.addRef(golf.properties.clubType, field.field.value.iri);
            }

            break;
        }

        case golf.classes.Player: {

            if(field.iri === golf.properties.ownedBy) {
            
                doc.addRef(golf.properties.ownedBy, field.field.value);
            }

            break;
        }

        default: {

            console.error('No field type defined', field.fieldType);
        }
    }
};

const addClubToList = async (club, doc) => {
    
    const newClub = doc.addSubject();
    newClub.addRef(rdf.type, golf.classes.Club);

    for(const field in club.fields) {

        addField(club.fields[field], newClub);
    }

    const newClubList = await doc.save([newClub]);

    return newClubList;
}

export default addClubToList;
