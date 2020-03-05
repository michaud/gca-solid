import { fetchDocument } from 'tripledoc';
import { solid } from 'rdf-namespaces';

import fetchProfile from '@golfservices/fetchProfile';

const fetchPublicTypeIndex = async () => {

    const profile = await fetchProfile();

    if (profile === null) return null;

    const publicTypeIndexUrl = profile.getRef(solid.publicTypeIndex);

    if (!publicTypeIndexUrl || typeof publicTypeIndexUrl !== 'string') return null;

    const document = await fetchDocument(publicTypeIndexUrl);

    return document;
};

export default fetchPublicTypeIndex;
