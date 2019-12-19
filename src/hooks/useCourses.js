import { useState, useEffect } from 'react';

import { solid } from 'rdf-namespaces';

import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import fetchCourseList from '@services/fetchCourseList';
import getCourseList from '@services/getCourseList';

const useCourses = (dirty) => {

    const publicTypeIndex = usePublicTypeIndex();
    const [courseData, setCourseData] = useState({ list: [], doc: undefined });

    useEffect(() => {

        if (publicTypeIndex) {

            (async () => {

                const courseListIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Course);

                if (!courseListIndex) {

                    // If no clubList document is listed in the public type index, create one:
                    const doc = await initialiseTypeDocument(
                        golf.classes.Course,
                        process.env.REACT_APP_GOLF_PATH + 'courses.ttl'
                    );

                    if (doc === null) return;
                    
                    setCourseData(state => ({
                        ...state,
                        doc
                    }));

                    return;

                } else {

                    // If the public type index does list a clubList document, fetch it:
                    const courseListUrl = courseListIndex.getRef(solid.instance);

                    if (typeof courseListUrl !== 'string') return;

                    const listDoc = await fetchCourseList(courseListUrl);
                    const listData = getCourseList(listDoc);

                    setCourseData({list: listData, doc: listDoc});
                }
            })();
        }
    }, [publicTypeIndex, dirty]);

    return courseData;
};

export default useCourses;
