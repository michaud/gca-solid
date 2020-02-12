import React, { useState, useEffect } from 'react';

import { Snackbar } from '@material-ui/core';

import useCourses from '@golfhooks/useCourses';

import deleteCourse from '@golfservices/deleteCourse';
import { PageContainer, PageContent } from '@golfstyles/page.style';
import saveResource from '@golfservices/saveResource';

import golf from '@golfutils/golf-namespace';

import Alert from '@golf/components/Alert';
import ModuleHeader from '@golf/components/ModuleHeader';

import CourseList from '@golf/GolfPage/children/course/CourseList';
import CourseForm from '@golf/GolfPage/children/course/CourseForm';

const ManageCourses = () => {

    const [reload, setReload] = useState(false);
    const [courses, setCourses] = useState([]);
    const [snackOpen, setSnackOpen] = useState(false);
    const [{
        courseListData,
        isLoading: courseListDataIsLoading,
        isError: courseListDataIsError
    }] = useCourses(reload);

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if(!didCancel) {

                setSnackOpen(courseListDataIsError);
                setCourses(courseListData.list);
                setReload(false);
            }
        }

        init();

        return () => {
            didCancel = true;
        }

    }, [courseListData, courseListDataIsError, reload]);

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
    };

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

    return (
        <>
            <ModuleHeader label="Courses" screenheader={ true } loading={ courseListDataIsLoading }/>
            <Snackbar
                open={ snackOpen }
                autoHideDuration={ 4000 }
                onClose={ handleSnackClose }
                anchorOrigin={{ vertical:'top', horizontal: 'center' }}>
                <Alert onClose={ handleSnackClose } severity="error">
                    Courses did not load
                </Alert>
            </Snackbar>
            <PageContainer>
                <PageContent>
                    <CourseForm onSave={ onSaveCourse }/>
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
