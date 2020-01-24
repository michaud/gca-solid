import golf from '@utils/golf-namespace';

import courseShape from '@contexts/course-shape.json';
import parseFields from '@utils/parseData/parseFields';

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
