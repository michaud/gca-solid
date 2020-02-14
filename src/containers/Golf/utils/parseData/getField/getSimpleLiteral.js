const getSimpleLiteral = predicate =>  (data, label, defaultValue) => {

    const value = data ? data.getLiteral(predicate) : defaultValue;

    return ({
        label,
        value
    })
};

export default getSimpleLiteral;
