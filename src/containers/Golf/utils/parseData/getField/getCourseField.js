import courseShape from '@golfcontexts/course-shape.json';
import golf from '@golfconstants/golf-namespace';
import parseFields from '@golfutils/parseData/parseFields';

const getCourseField = doc => (data, label, defaultValue) => {

    let value = defaultValue;

    const courseIds = data.getAllRefs(golf.properties.gameCourse);
    const courseRef = doc.getSubject(courseIds[0]);

    value = parseFields(courseShape, doc)(courseRef);

    return ({
        label,
        value
    });
};

export default getCourseField;
