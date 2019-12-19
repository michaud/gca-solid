const deleteClub = async (club, doc) => {

    doc.removeSubject(club.iri);
    await doc.save();
};

export default deleteClub;
