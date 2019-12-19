import courseShape from '@contexts/course-shape.json';
import holeShape from '@contexts/hole-shape.json';
import golf from '@utils/golf-namespace';
import { rdf } from 'rdf-namespaces';



const addField = (field, ref, doc) => {

    switch(field.fieldType) {

        case golf.types.string : {

            ref.addLiteral(field.iri, field.field.value);

            break;
        }

        case golf.types.nonNegativeInteger : {

            ref.addLiteral(field.iri, parseInt(field.field.value));

            break;
        }

        case golf.classes.Hole : {

            field.field.value.forEach(hole => {
                
                const holeRef = doc.addSubject();
                holeRef.addRef(rdf.type, golf.classes.Hole);

                for(const prop in hole.fields) {

                    addField(hole.fields[prop], holeRef, doc);
                }

                ref.addRef(golf.properties.courseHoles, holeRef.asRef());
            });

            break;
        }

        default : {

        }
    }
};

const saveCourse = async (course, doc) => {

    const newCourse = doc.addSubject();
    newCourse.addRef(rdf.type, golf.classes.Course);

    for(const field in course.fields) {

        addField(course.fields[field], newCourse, doc);
    }

    await doc.save();
};

export default saveCourse;
