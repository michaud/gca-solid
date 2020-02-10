import saveResource from "@golfservices/saveResource";
import golf from "@golfutils/golf-namespace";

const saveHoleToGame = ({ hole, gameDoc }) => {

    saveResource({
        element: hole,
        doc: gameDoc,
        type: golf.classes.GameHole
    });

    gameDoc.save();
};

export default saveHoleToGame;
