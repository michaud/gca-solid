import { createDocument } from "tripledoc";
import { space } from "rdf-namespaces";

import saveResource from "@golfservices/saveResource";
import paths from "@golfconstants/paths";
import golf from "@golfutils/golf-namespace";
import fetchProfile from "@golfservices/fetchProfile";
import fetchResource from "./fetchResource";

const getGameDocument = async (resource, list) => {

    let doc;

    if(resource.iri === '') {
        
        doc = await createGameDoc(list);

    } else {

        doc = await fetchResource(resource.iri);
    }

    return doc;
};

const createGameDoc = async listDoc => {

    const profile = await fetchProfile();
    const storage = profile.getRef(space.storage);
    const url = `${ storage }${ paths.REACT_APP_GOLF_DATA_GAMES_PATH }/${ Date.now() }.ttl`;

    const gameDoc = await createDocument(url).save();

    const subject = listDoc.addSubject();
    subject.addRef(golf.classes.Game, gameDoc.asRef());

    await listDoc.save();

    return gameDoc;
}

const saveGameResourse = async ({
    resource,
    list,
    type
}) => {

    const doc = await getGameDocument(resource, list);

    saveResource({
        resource,
        doc,
        type
    });
};

export default saveGameResourse;
