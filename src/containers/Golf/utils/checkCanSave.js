import golf from "@golfconstants/golf-namespace";

const hasValue = item => {

    switch(item.type) {

        case golf.types.string: {
        
            const can = item.value !== '';

            return ({
                can,
                reason: !can ? `add a ${ item.label}` : ''
            });
        }

        case golf.types.nonNegativeInteger: {

            const can = typeof(item.value) === 'number' && !isNaN(item.value) && item.value > 0;

            return ({
                can,
                reason: !can ? `add a ${ item.label}` : ''
            });
        }

        case golf.types.integer: {
            
            const can = typeof(item.value) === 'number' && !isNaN(item.value);

            return ({
                can,
                reason: !can ? `add a ${ item.label}` : ''
            });
        }

        case golf.types.text: {
        
            const can = item.value !== '';
            return ({
                can,
                reason: !can ? `add a ${ item.label }` : ''
            });
        }

        case golf.types.dateTime: {
            
            const can = item.value instanceof Date;
            return ({
                can,
                reason: !can ? `fill the ${ item.label }` : ''
            });
        }

        case golf.classes.Club: {
            
            let can = false;
            let reason = '';
            if(item.predicate === 'clubType') {

                can = typeof(item.value) === 'object';
                reason = !can ?  `fill the ${ item.label }` : ''

            } else {

                can = item.value.length > 0;
                reason = !can ?  `add a ${ item.label }` : ''
            }

            return ({
                can,
                reason
            });
        }

        case golf.classes.Hole: {

            const tested = item.value.find(hole => parseInt(hole.holeStrokeIndex.value) === 0);
            const hasZeroValue = tested === undefined ? false : true;
            const can = item.value.length > 0 && !hasZeroValue;

            return ({
                can,
                reason: hasZeroValue ? `hole ${ tested.holeNumber.value } has SI 0` : !can ? `add ${ item.label }` : ''
            })
        }
        case golf.classes.Player:{

            const can = typeof(item.value) === 'object';

            return ({
                can,
                reason: !can ? `set a ${ item.label}` : ''
            });
        }
        case golf.classes.Course:{

            const can = typeof(item.value) === 'object';
            return ({
                can,
                reason: !can ? `set a ${ item.label}` : ''
            });
        }
        case golf.classes.Marker: {

            const can = typeof(item.value) === 'object';

            return ({
                can,
                reason: !can ? `set a ${ item.label}` : ''
            });
        }
        case golf.classes.Bag:{

            const can = item.value.clubs.value.length > 0;

            return ({
                can,
                reason: !can ? `put clubs in your ${ item.label}` : ''
            });
        }
        case golf.classes.GamePlayingHandicap:{
            
            const can = typeof(item.value) === 'object';
            return ({
                can,
                reason: !can ? `set a ${ item.label}` : ''
            });
        }

        default: return false;
    }
};

const test = state => entry => {
    
    const field = state[entry.predicate];
    const entryNeedsValue = field.hasOwnProperty('required') ? field.required : true;

    return entryNeedsValue ? hasValue(field) : ({
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
