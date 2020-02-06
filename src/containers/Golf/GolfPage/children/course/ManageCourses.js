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
    const courseData = useCourses(reload);
    const [courses, setCourses] = useState([]);

    const onSaveCourse = (course) => {

        saveResource({
            resource: course,
            doc: courseData.doc,
            type: golf.classes.Course
        });
        setReload(true);
    };

    const onDeleteCourseHandler = (course) => {

        deleteCourse(course, courseData.doc);
        setReload(true);
    };


    useEffect(() => {

        if (courseData) {

            const couseList = courseData.list;

            setCourses(couseList);
            setReload(false);
        }

    }, [courseData, reload]);

    const loading = reload || courseData.doc === undefined;

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
