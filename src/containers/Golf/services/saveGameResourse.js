import { createDocument } from "tripledoc";
import { space } from "rdf-namespaces";

import saveResource from "@golfservices/saveResource";
import paths from "@golfconstants/paths";
import golf from "@golfutils/golf-namespace";
import fetchProfile from "@golfservices/fetchProfile";

const saveGameResourse = async ({
    resource,
    doc: sourceDoc,
    type
}) => {

    let doc = sourceDoc;
    
    if(resource.iri === '') doc = await createGameDoc(sourceDoc); 

    saveResource({
        resource,
        doc,
        type
    })
};

export default saveGameResourse;

const createGameDoc = async (doc) => {

    const profile = await fetchProfile();
    const storage = profile.getRef(space.storage);
    const url = `${ storage }${ paths.REACT_APP_GOLF_DATA_GAMES_PATH }/${ Date.now() }.ttl`;

    const gameDoc = await createDocument(url).save();

    const subject = doc.addSubject();
    subject.addRef(golf.classes.Game, gameDoc.asRef());

    await doc.save();

    return gameDoc;
}
