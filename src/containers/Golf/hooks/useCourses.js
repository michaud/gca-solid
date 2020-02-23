import { useState, useEffect } from 'react';

import { solid } from 'rdf-namespaces';

import golf from '@golfutils/golf-namespace';
import initialiseTypeDocument from '@services/initialiseTypeDocument';
import getListFromDoc from '@golfservices/getListFromDoc';
import courseShape from '@golfcontexts/course-shape.json';
import fetchResource from '@golfservices/fetchResource';
import paths from '@golfconstants/paths';

const useCourses = (publicTypeIndex) => {
    
    const [reload, setReload] = useState(false);
    const [courseListData, setCourseListData] = useState({ list: [], doc: undefined });
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let didCancel = false;

        if (publicTypeIndex.doc) {

            const loadData = async () => {

                try {
                    const courseListIndex = publicTypeIndex.doc.findSubject(solid.forClass, golf.classes.Course);

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

                } catch (error) {

                    if(!didCancel) {

                        console.log('error: ', error);
                        setIsError(error)
                    }

                } finally {

                    if(!didCancel) {

                        setReload(false);
                        setIsLoading(false);
                    }
                }
            };

            if(!didCancel) setIsLoading(true);

            loadData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex.doc, reload]);

    return [{ courseListData, isLoading, isError }, () => { setReload(true) }];
};

export default useCourses;
