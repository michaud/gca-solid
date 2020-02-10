import saveResource from "@golfservices/saveResource";
import golf from "@golfutils/golf-namespace";

const saveHoleToGame = ({ hole, doc }) => {

    saveResource({
        element: hole,
        doc,
        type: golf.classes.GameHole
    });

    doc.save();
};

export default saveHoleToGame;
