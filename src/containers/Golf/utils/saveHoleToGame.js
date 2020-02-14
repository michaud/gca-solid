import saveResource from "@golfservices/saveResource";
import golf from "@golfutils/golf-namespace";

const saveHoleToGame = async ({ hole, doc }) => {

    saveResource({
        element: hole,
        doc,
        type: golf.classes.GameHole
    });

    await doc.save();
};

export default saveHoleToGame;
