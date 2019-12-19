import { fetchDocument } from 'tripledoc';

const fetchClubList = async (clubListUrl) => {

    if(!clubListUrl) return null;
    
    const doc = await fetchDocument(clubListUrl);

    return doc;
};

export default fetchClubList;
