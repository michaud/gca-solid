import typeHasValue from "@golfutils/checkHasValue/typeHasValue";

const test = state => entry => {
    
    const field = state[entry.predicate];
    const entryNeedsValue = field.hasOwnProperty('required') ? field.required : true;

    return entryNeedsValue ? typeHasValue[field.type](field) : ({
        can: true,
        reason: ''
    });
};

const checkCanSave = (state, stateShape) => {
    
    if(!state) return ({
        can: false,
        reasons: []
    }) ;
    
    const tester = test(state);

    const reasons = [];

    const can = stateShape.shape.every(item => {

        const { can, reason } = tester(item);

        if(!can && reason !== '') reasons.push(reason);

        return can;
    });

    return ({
        can,
        reasons
    }) 
};

export default checkCanSave;
