import { useAppData } from "@golfcontexts/dataProvider/AppDataProvider";

const useCourseData = () => {

    const {
        value: {
            progress,
            count,
            hasError,
            course: {
                courseListData,
                hasCourseListData,
                courseListDataIsError,
                courseListDataIsLoading,
                doCourseListDataReload
            }
        }
    } = useAppData();

    return {
        progress,
        count,
        hasError,
        courseListData,
        hasCourseListData,
        courseListDataIsError,
        courseListDataIsLoading,
        doCourseListDataReload
    };
};

export default useCourseData;
