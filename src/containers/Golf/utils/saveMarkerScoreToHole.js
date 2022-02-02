import golf from "@golfconstants/golf-namespace";

const saveMarkerScoreToHole = ({
    currHole,
    doc,
    score
}) => {

    const holeRef = doc.getSubject(currHole.iri);
    holeRef.setLiteral(golf.properties.gameMarkerStrokeCount, score);
    doc.save();
};

export default saveMarkerScoreToHole;
