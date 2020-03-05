import golf from '@golfconstants/golf-namespace';

const getClubsField = doc => (data, label, clubListData) => {

    const clubIds = data.getAllRefs(golf.properties.clubs);
    const clubRefs = clubIds.map(id => doc.getSubject(id));
    const bagClubs = clubRefs.reduce((acc, item) => {

        const club = clubListData.list.find(testItem => {
            
            return testItem.iri.split('#')[1] === item.asRef().split('#')[1];
        })

        if(club) acc.push(club);

        return acc;

    }, [])

    return ({
        label,
        value: bagClubs
    });
};

export default getClubsField;
