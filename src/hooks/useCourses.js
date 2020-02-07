import { useState, useEffect } from 'react';

import { solid } from 'rdf-namespaces';

import usePublicTypeIndex from './usePublicTypeIndex';
import golf from '@utils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import getListFromDoc from '@services/getListFromDoc';
import courseShape from '@contexts/course-shape.json';
import fetchResource from '@services/fetchResource';
import paths from '@constants/paths';

const useCourses = (initialReload) => {
    
    const [reload, setReload] = useState(initialReload);
    const [{ publicTypeIndex, publicTypeIndexIsLoading, publicTypeIndexIsError }, reLoadPublicTypeIndex] = usePublicTypeIndex(reload);
    const [courseListData, setCourseListData] = useState({ list: [], doc: undefined });
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        let didCancel = false;

        if (publicTypeIndex) {

            const loadData = async () => {

                const courseListIndex = publicTypeIndex.findSubject(solid.forClass, golf.classes.Course);

                if (!courseListIndex) {

                    // If no clubList document is listed in the public type index, create one:
                    const doc = await initialiseTypeDocument(
                        golf.classes.Course,
                        paths.REACT_APP_GOLF_DATA_PATH + 'courses.ttl'
                    );

                    if (doc === null) return;
                    
                    if(!didCancel) setCourseListData(state => ({
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

                    if(!didCancel) setCourseListData({ list, doc });
                }
            };

            loadData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex, reload]);

    return [{ courseListData, isLoading, isError }, setReload];;
};

export default useCourses;
