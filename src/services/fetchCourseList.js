import { fetchDocument } from 'tripledoc';

const fetchCourseList = async (clubListUrl) => {

    if(!clubListUrl) return null;
    
    const doc = await fetchDocument(clubListUrl);

    return doc;
};

export default fetchCourseList;
