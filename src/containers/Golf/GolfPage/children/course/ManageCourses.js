import React, { useState, useEffect } from 'react';

import ModuleHeader from '@containers/Golf/GolfPage/children/ModuleHeader';
import useCourses from '@hooks/useCourses';
import CourseList from '@containers/Golf/GolfPage/children/course/CourseList';
import CourseForm from '@containers/Golf/GolfPage/children/course/CourseForm';
import deleteCourse from '@services/deleteCourse';
import { PageContainer } from '@styles/page.style';
import saveResource from '@services/saveResource';
import golf from '@utils/golf-namespace';

const ManageCourses = () => {

    const [reload, setReload] = useState(false);
    const [{ courseListData, courseListDataIsLoading, courseListDataIsError }, reloadCourseListData] = useCourses(reload);
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if(!didCancel) {
                setCourses(courseListData.list);
                setReload(false);
            }
        }

        init();

        return () => {
            didCancel = true;
        }

    }, [courseListData, reload]);

    const onSaveCourse = (course) => {

        saveResource({
            resource: course,
            doc: courseListData.doc,
            type: golf.classes.Course
        });
        setReload(true);
    };

    const onDeleteCourseHandler = (course) => {

        deleteCourse(course, courseListData.doc);
        setReload(true);
    };

    const loading = reload || courseListData.doc === undefined;

    return (
        <>
            <ModuleHeader label="Courses" screenheader={ true } loading={ loading }/>
            <PageContainer>
                <CourseForm onSave={ onSaveCourse }/>
                <CourseList
                    courses={ courses }
                    onSaveCourse={ onSaveCourse }
                    onDelete={ onDeleteCourseHandler }/>
            </PageContainer>
        </>
    );
};

export default ManageCourses;
