const deleteCourse = (course, doc) => {

    course.fields.courseHoles.value.forEach(val => {
        doc.removeSubject(val.iri);
    });

    doc.removeSubject(course.iri);
    doc.save();
};

export default deleteCourse;
