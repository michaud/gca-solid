import golf from "@golfconstants/golf-namespace";
import { deleteFile } from "@golfutils/ldflex-helper";

const deleteGame = async (game, gameListData) => {

    const start = game.iri.lastIndexOf('/');
    const end = game.iri.lastIndexOf('#');
    const filePath = game.iri.substring(start, end);

    const gameRef = gameListData.doc
        .findSubjects(golf.classes.Game)
        .filter(node => node.getRef().includes(filePath))[0];

    gameListData.doc.removeSubject(gameRef.asRef());

    await gameListData.doc.save();

    deleteFile(game.iri.substring(0, game.iri.lastIndexOf('#')));
};

export default deleteGame;
