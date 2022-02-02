import { space } from 'rdf-namespaces';
import { createDocument } from 'tripledoc';

import fetchProfile from '@golfservices/fetchProfile';
import fetchPublicTypeIndex from '@golfservices/fetchPublicTypeIndex';
import addToTypeIndex from '@golfservices/addToTypeIndex';

const initialiseTypeDocument = async (type, relUrl, setupType) => {
    
    const [profile, publicTypeIndex] = await Promise.all([fetchProfile(), fetchPublicTypeIndex()]);

    if (profile === null || publicTypeIndex === null) return null;

    const storage = profile.getRef(space.storage);

    if (typeof storage !== 'string') return null;

    // Note: There's an assumption here that `/public/` exists and is writable for this app.
    //       In the future, "Shapes" should hopefully allow us to get more guarantees about this:
    //       https://ruben.verborgh.org/blog/2019/06/17/shaping-linked-data-apps/#need-for-shapes

    const ref = storage + relUrl;
    let doc = createDocument(ref);

    if(setupType) doc = setupType(doc);

    await doc.save();

    await addToTypeIndex(publicTypeIndex, doc, type);

    return doc;
};

export default initialiseTypeDocument;
