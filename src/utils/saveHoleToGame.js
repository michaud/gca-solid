import saveResource from "@services/saveResource";
import golf from "./golf-namespace";

const saveHoleToGame = ({ hole, gameDoc }) => {

    saveResource({
        element: hole,
        doc: gameDoc,
        type: golf.classes.GameHole
    });

    gameDoc.save();
};

export default saveHoleToGame;
