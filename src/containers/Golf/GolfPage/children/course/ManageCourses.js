import React, { useState, useEffect } from 'react';

import ModuleHeader from '@containers/Golf/GolfPage/children/ModuleHeader';
import useCourses from '@hooks/useCourses';
import { errorToaster } from '@utils/';
import { useNotification } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import CourseList from '@containers/Golf/GolfPage/children/course/CourseList';
import CourseForm from '@containers/Golf/GolfPage/children/course/CourseForm';
import saveCourse from '@services/saveCourse';
import { PageContainer } from '@styles/page.style';

const ManageCourses = ({ match, webId, history }) => {

    const [reload, setReload] = useState(false);
    const { notification } = useNotification(webId);
    const courseData = useCourses(reload);
    const [courses, setCourses] = useState([]);
    const { t } = useTranslation();

    const onSaveCourse = (course) => {

        saveCourse(course, courseData.doc);
        setReload(true);
    };

    const init = async () => {

        try {

            if (courseData) {

                const couseList = courseData.list;
                setCourses(couseList);
                setReload(false);
            }

        } catch (e) {
            /**
             * Check if something fails when we try to create a inbox
             * and show user a possible solution
             */
            if (e.name === 'Inbox Error') {
                return errorToaster(e.message, 'Error', {
                    label: t('errorCreateInbox.link.label'),
                    href: t('errorCreateInbox.link.href')
                });
            }

            errorToaster(e.message, 'Error');
        }
    };

    useEffect(() => {

        if (webId && notification.notify) {
            init();
        }

    }, [webId, courseData, reload, notification.notify]);

    return (
        <>
            <ModuleHeader label="Courses" screenheader={ true }/>
            <PageContainer>
                <CourseForm onSave={ onSaveCourse }/>
                <CourseList courses={ courses }/>
            </PageContainer>
        </>
    )
}

export default ManageCourses;
