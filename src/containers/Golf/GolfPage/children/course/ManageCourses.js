import React, { useState, useEffect } from 'react';

import deleteCourse from '@golfservices/deleteCourse';
import { PageContainer, PageContent } from '@golfstyles/page.style';
import saveResource from '@golfservices/saveResource';

import golf from '@golfconstants/golf-namespace';

import ModuleHeader from '@golf/components/ModuleHeader';

import CourseList from '@golfpagectrl/course/CourseList';
import CourseForm from '@golfpagectrl/course/CourseForm';
import { useCourseData } from '@golfcontexts/dataProvider/AppDataProvider';

const ManageCourses = () => {

    const [courses, setCourses] = useState([]);

    const {
        courseListData,
        courseListDataIsError,
        courseListDataIsLoading,
        reloadCourses
    } = useCourseData();
    
    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if(!didCancel) setCourses(courseListData.list);
        }

        init();

        return () => { didCancel = true; }

    }, [courseListData, courseListDataIsError]);

    const onSaveCourse = (course) => {

        saveResource({
            resource: course,
            doc: courseListData.doc,
            type: golf.classes.Course
        }).then(() => reloadCourses());
    };

    const onDeleteCourseHandler = (course) => {

        deleteCourse(course, courseListData.doc);
        reloadCourses();
    };

    return (
        <>
            <ModuleHeader label="Courses" screenheader={ true } loading={ courseListDataIsLoading }/>
            <PageContainer>
                <PageContent>
                    <div className="c-box">
                        <CourseForm onSave={ onSaveCourse }/>
                    </div>
                    <CourseList
                        courses={ courses }
                        onSaveCourse={ onSaveCourse }
                        onDelete={ onDeleteCourseHandler }/>
                </PageContent>
            </PageContainer>
        </>
    );
};

export default ManageCourses;
