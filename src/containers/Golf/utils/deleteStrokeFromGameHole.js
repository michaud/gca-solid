import golf from '@golfconstants/golf-namespace';

const deleteStrokeFromGameHole = (doc, stroke, hole) => {

    const holeRef = doc.getSubject(hole.iri);
    holeRef.removeRef(golf.properties.gameStrokes, stroke.iri);
    doc.removeSubject(stroke.strokeLocation.value.iri);
    doc.removeSubject(stroke.iri);

    return doc.save();
};

export default deleteStrokeFromGameHole;
