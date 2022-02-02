import golf from "@golfconstants/golf-namespace";

const stringHasValue = (item) => {

    const can = item.value !== '';

    return ({
        can,
        reason: !can ? `add a ${ item.label}` : ''
    });
};

const nonNegativeIntegerHasValue = item => {

    const can = typeof(item.value) === 'number' && !isNaN(item.value) && item.value > 0;

    return ({
        can,
        reason: !can ? `add a ${ item.label}` : ''
    });
}

const integerHasValue = item => {
            
    const can = typeof(item.value) === 'number' && !isNaN(item.value);

    return ({
        can,
        reason: !can ? `add a ${ item.label}` : ''
    });
};

const textHasValue = item => {
        
    const can = item.value !== '';

    return ({
        can,
        reason: !can ? `add a ${ item.label }` : ''
    });
};

const dateTimeHasValue = item => {
            
    const can = item.value instanceof Date;

    return ({
        can,
        reason: !can ? `fill the ${ item.label }` : ''
    });
};

const clubFieldHasValue = item => {
            
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
};

const holeFieldHasValue = item => {

    const tested = item.value.find(hole => parseInt(hole.holeStrokeIndex.value) === 0);
    const hasZeroValue = tested === undefined ? false : true;
    const can = item.value.length > 0 && !hasZeroValue;

    return ({
        can,
        reason: hasZeroValue ? `hole ${ tested.holeNumber.value } has SI 0` : !can ? `add ${ item.label }` : ''
    })
};

const playerFieldHasValue = item => {

    const can = typeof(item.value) === 'object';

    return ({
        can,
        reason: !can ? `set a ${ item.label}` : ''
    });
};

const courseFieldHasValue = item => {

    const can = typeof(item.value) === 'object';

    return ({
        can,
        reason: !can ? `set a ${ item.label}` : ''
    });
};

const markerFieldHasValue = item => {

    const can = typeof(item.value) === 'object';

    return ({
        can,
        reason: !can ? `set a ${ item.label}` : ''
    });
};

const bagFieldHasValue = item => {

    const can = item.value.clubs.value.length > 0;

    return ({
        can,
        reason: !can ? `put clubs in your ${ item.label}` : ''
    });
};

const gamePlayingHandicapHasValue = item => {
            
    const can = typeof(item.value) === 'object';

    return ({
        can,
        reason: !can ? `set a ${ item.label}` : ''
    });
};

const mapTypeHasValue = {
    [golf.types.string]: stringHasValue,
    [golf.types.nonNegativeInteger]: nonNegativeIntegerHasValue,
    [golf.types.integer]: integerHasValue,
    [golf.types.text]: textHasValue,
    [golf.types.dateTime]: dateTimeHasValue,
    [golf.classes.Club]: clubFieldHasValue,
    [golf.classes.Hole]: holeFieldHasValue,
    [golf.classes.Player]: playerFieldHasValue,
    [golf.classes.Course]: courseFieldHasValue,
    [golf.classes.Marker]: markerFieldHasValue,
    [golf.classes.Bag]: bagFieldHasValue,
    [golf.classes.GamePlayingHandicap]: gamePlayingHandicapHasValue
};

export default mapTypeHasValue;
