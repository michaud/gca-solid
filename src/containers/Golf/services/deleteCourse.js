const deleteCourse = (course, doc) => {

    course.courseHoles.value.forEach(val => {
        doc.removeSubject(val.iri);
    });

    doc.removeSubject(course.iri);
    doc.save();
};

export default deleteCourse;
