import { createDocument } from "tripledoc";

import saveResource from "./saveResource";
import paths from "@constants/paths";
import golf from "@utils/golf-namespace";
import fetchProfile from "./fetchProfile";
import { space } from "rdf-namespaces";

const saveGameResourse = async({
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
