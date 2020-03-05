const getClubField = predicate => (data, fieldPredicate, clubTypes, clubType) => {

    const label = clubType[fieldPredicate].label;
    const clubTypeRef = data.getRef(predicate);

    const value = clubTypes.find(item => item.iri === clubTypeRef);
    
    return ({
        label,
        value
    });
};
  
export default getClubField;
