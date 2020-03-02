import golf from "../../golf-namespace";

const getClubField = predicate => (data, fieldPredicate, clubTypes, clubType) => {

    const label = clubType[fieldPredicate].label;
    const clubTypeRef = data.getRef(golf.properties.clubType);

    const value = clubTypes.find(item => item.iri === clubTypeRef);
    
    return ({
        label,
        value
    });
};
  
export default getClubField;
