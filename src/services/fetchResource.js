import { fetchDocument } from 'tripledoc';

const fetchResource = async (url) => {

    if(!url) return null;
    
    const doc = await fetchDocument(url);

    return doc;
};

export default fetchResource;
