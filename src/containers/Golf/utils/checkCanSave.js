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
        reasons: ['nothing to save']
    }) ;
    
    const tester = test(state);

    const reasons = [];
    const can = stateShape.shape.every(item => {

        const tested = tester(item);
        if(!tested.can) reasons.push(tested.reason);

        return tester(item).can;
    });

    return ({
        can,
        reasons
    }) 
};

export default checkCanSave;
