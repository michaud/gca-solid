import { fetchDocument } from 'tripledoc';

const fetchMarkers = async (markersUrl) => {

    if(!markersUrl) return null;
    
    const doc = await fetchDocument(markersUrl);

    return doc;
};

export default fetchMarkers;
