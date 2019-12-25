import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import ModuleHeader from './ModuleHeader';
import useCourses from '@hooks/useCourses';
import { errorToaster } from '@utils/';
import { useNotification } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import saveCourse from '@services/saveCourse';

const PageContainer = styled.div`
    margin: 0 2rem 2rem 2rem;
    > * {
        margin-bottom: 2rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const ManageCourses = ({ match, webId, history }) => {

    const [dirty, setDirty] = useState(true);
    const { notification } = useNotification(webId);
    const courseList = useCourses(dirty);
    const [courses, setCourses] = useState([]);
    const { t } = useTranslation();

    const onSaveCourse = (course) => {

        saveCourse(course, courseList.doc);
    };

    const init = async () => {

        try {

            if (courseList) {

                const clubs = courseList.list;
                setCourses(clubs);
                setDirty(false);
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

    }, [webId, courseList, notification.notify]);

    return (
        <>
            <ModuleHeader label="Courses" screenheader={ true }/>
            <PageContainer>
                <CourseList courses={ courses }/>
                <CourseForm onSave={ onSaveCourse }/>
            </PageContainer>
        </>
    )
}

export default ManageCourses;
