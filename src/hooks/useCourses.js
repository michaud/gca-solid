import { useState, useEffect } from 'react';

import { solid } from 'rdf-namespaces';

import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import getListFromDoc from '@services/getListFromDoc';
import courseShape from '@contexts/course-shape.json';
import fetchResource from '@services/fetchResource';
import paths from '@constants/paths';

const useCourses = (reload) => {

    const publicTypeIndex = usePublicTypeIndex(reload);
    const [courseData, setCourseData] = useState({ list: [], doc: undefined });

    useEffect(() => {

        if (publicTypeIndex || reload) {

            (async () => {

                const courseListIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Course);

                if (!courseListIndex) {

                    // If no clubList document is listed in the public type index, create one:
                    const doc = await initialiseTypeDocument(
                        golf.classes.Course,
                        paths.REACT_APP_GOLF_DATA_PATH + 'courses.ttl'
                    );

                    if (doc === null) return;
                    
                    setCourseData(state => ({
                        ...state,
                        doc
                    }));

                    return;

                } else {

                    // If the public type index does list a clubList document, fetch it:
                    const url = courseListIndex.getRef(solid.instance);

                    if (typeof url !== 'string') return;

                    const doc = await fetchResource(url);

                    const list = getListFromDoc(
                        doc,
                        golf.classes.Course,
                        courseShape
                    )();

                    setCourseData({ list, doc });
                }
            })();
        }
    }, [publicTypeIndex, reload]);

    return courseData;
};

export default useCourses;
