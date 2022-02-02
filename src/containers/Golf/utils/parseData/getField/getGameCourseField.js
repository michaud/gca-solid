import courseShape from '@golfcontexts/course-shape.json';
import golf from '@golfconstants/golf-namespace';
import parseFields from '@golfutils/parseData/parseFields';

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
