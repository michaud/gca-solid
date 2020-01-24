
const getClubField = predicate => (data, fieldPredicate, clubTypes, clubType) => {

    const label = clubType[fieldPredicate].label;
    const clubQuads = data.getTriples();
    const displayField = clubQuads.find(quad => quad.predicate.value === predicate);

    const value = clubTypes.find(item => item.iri === displayField.object.value);
    
    return ({
        label,
        value
    });
};
  
export default getClubField;
