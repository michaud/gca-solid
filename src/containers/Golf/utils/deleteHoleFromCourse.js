import golf from "./golf-namespace";

//not for game holes
const deleteHoleFromCourse = async (hole, course, courseListData) => {

    const { doc } = courseListData;
    const courseRef = doc.getSubject(course.iri);
    courseRef.removeRef(golf.properties.courseHoles, hole.iri);
    doc.removeSubject(hole.iri);

    await doc.save();
};

export default deleteHoleFromCourse;
