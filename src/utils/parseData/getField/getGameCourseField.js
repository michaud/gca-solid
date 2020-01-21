import golf from '@utils/golf-namespace';

import courseShape from '@contexts/course-shape.json';
import parseFields from '@utils/parseData/parseFields';

const getGameCourseField = doc => (data, label, defaultValue, clubTypes, clubType) => {

    let value = defaultValue;

    const courseIds = data.getAllRefs(golf.properties.gameCourse);
    const courseRef = doc.getSubject(courseIds[0]);

    value = parseFields(courseShape, doc, golf.properties.gameCourse, clubTypes, clubType)(courseRef);

    return ({
        label,
        value
    });
};

export default getGameCourseField;
