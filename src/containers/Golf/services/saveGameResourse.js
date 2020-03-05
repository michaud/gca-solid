import { createDocument } from "tripledoc";
import { space } from "rdf-namespaces";

import saveResource from "@golfservices/saveResource";
import paths from "@golfconstants/paths";
import golf from "@golfconstants/golf-namespace";
import fetchProfile from "@golfservices/fetchProfile";
import fetchResource from "@golfservices/fetchResource";

const getGameDocument = async (resource, list) => {

    let doc;

    if(resource.iri === '') {
        
        doc = await createGameDoc(list);

    } else {

        doc = await fetchResource(resource.iri);
    }

    return doc;
};

const createGameDoc = async () => {

    const profile = await fetchProfile();
    const storage = profile.getRef(space.storage);
    const url = `${ storage }${ paths.REACT_APP_GOLF_DATA_GAMES_PATH }/${ Date.now() }.ttl`;

    const gameDoc = await createDocument(url).save();

    return gameDoc;
}

const saveGameResourse = async ({
    resource,
    list,
    type
}) => {

    const doc = await getGameDocument(resource, list);

    const gameDoc = saveResource({
        resource,
        doc,
        type
    });

    //add game to list with same identifier as game itself
    const ref = gameDoc.asRef();
    const subject = list.addSubject({ identifier: ref.split('#')[1] });
    const fileName = ref.substring(ref.indexOf('games/'),ref.indexOf('#'))
    subject.setRef(golf.classes.Game, fileName);

    await list.save();
};

export default saveGameResourse;
