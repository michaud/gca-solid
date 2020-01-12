const namespace = 'https://michaud.inrupt.net/public/golf/';
const namespaceHashed = 'https://michaud.inrupt.net/public/golf#';

const golf = {
    root: `${ namespace }`,
    classes: {
        Club: `${ namespace }Club`,
        Player: `${ namespace }Player`,
        Marker: `${ namespace }Marker`,
        Bag: `${ namespace }Bag`,
        Course: `${ namespace }Course`,
        Hole: `${ namespace }Hole`,
        Game: `${ namespace }Game`,
        GamePlayingHandicap:  `${ namespace }GamePlayingHandicap`

    },
    properties: {
        clubType: `${ namespace }clubType`,
        fieldLabel: `${ namespace }fieldLabel`,
        clubBrand: `${ namespace }clubBrand`,
        clubName: `${ namespace }clubName`,
        clubs: `${ namespace }clubs`,
        clubsH: `${ namespaceHashed }clubs`,
        courseHoles: `${ namespace }courseHoles`,
        gamePlayer: `${ namespace }gamePlayer`,
        gameMarker: `${ namespace }gameMarker`,
        gameCourse: `${ namespace }gameCourse`,
        gameBag:  `${ namespace }gameBag`,
        gamePlayingHandicap:  `${ namespace }gamePlayingHandicap`
    },
    types: {
        string: 'http://www.w3.org/2001/XMLSchema#string',
        nonNegativeInteger: 'http://www.w3.org/2001/XMLSchema#nonNegativeInteger',
        text: 'https://schema.org/Text',
        integer: 'http://www.w3.org/2001/XMLSchema#integer',
        dateTime: 'http://www.w3.org/2001/XMLSchema#DateTime',
    }
};

export default golf;
