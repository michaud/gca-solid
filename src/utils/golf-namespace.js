const namespace = 'https://michaud.inrupt.net/public/golf/';
const namespaceHashed = 'https://michaud.inrupt.net/public/golf#';

const golf = {
    root: `${ namespace }`,
    classes: {
        Club: `${ namespace }Club`,
        Player: `${ namespace }Player`,
        Bag: `${ namespace }Bag`,
        Course: `${ namespace }Course`,
        Hole: `${ namespace }Hole`
    },
    properties: {
        clubType: `${ namespace }clubType`,
        ownedBy: `${ namespace }ownedBy`,
        fieldLabel: `${ namespace }fieldLabel`,
        clubBrand: `${ namespace }clubBrand`,
        clubName: `${ namespace }clubName`,
        clubs: `${ namespace }clubs`,
        clubsH: `${ namespaceHashed }clubs`,
        courseHoles: `${ namespace }courseHoles`,
    },
    types: {
        string: 'http://www.w3.org/2001/XMLSchema#string',
        nonNegativeInteger: 'http://www.w3.org/2001/XMLSchema#nonNegativeInteger'
    }
};

export default golf;
