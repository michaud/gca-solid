const deleteCourse = (course, doc) => {

    course.fields.courseHoles.field.value.forEach(val => {
        doc.removeSubject(val.iri);
    });

    doc.removeSubject(course.iri);
    doc.save();
};

export default deleteCourse;
