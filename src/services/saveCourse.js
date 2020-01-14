import courseShape from '@contexts/course-shape.json';
import golf from '@utils/golf-namespace';
import { rdf } from 'rdf-namespaces';
import { addField } from '@utils/addField';
import { setField } from '@utils/setField';

const saveCourse = async (course, doc) => {
    
    const isNewCourse = course.iri === '';
    const courseRef = isNewCourse ? doc.addSubject() : doc.getSubject(course.iri);
    const fieldAction = isNewCourse ? addField : setField;

    if(isNewCourse) courseRef.addRef(rdf.type, golf.classes.Course);
    
    courseShape.shape.forEach(field => {

        fieldAction(field, courseShape, course.fields[field.predicate], courseRef, doc);
    });

    return await doc.save();
};

export default saveCourse;
