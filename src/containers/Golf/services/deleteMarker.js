const deleteMarker = async (marker, doc) => {

    doc.removeSubject(marker.iri);
    await doc.save();
};

export default deleteMarker;
