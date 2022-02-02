import saveResource from "@golfservices/saveResource";
import golf from "@golfconstants/golf-namespace";

const saveHoleToGame = ({ hole, doc }) => {

    return saveResource({
        resource: hole,
        doc,
        type: golf.classes.GameHole
    });
};

export default saveHoleToGame;
