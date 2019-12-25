import { fetchDocument } from 'tripledoc';

const fetchPlayer = async (playerUrl) => {

    if(!playerUrl) return null;
    
    const doc = await fetchDocument(playerUrl);

    return doc;
};

export default fetchPlayer;
