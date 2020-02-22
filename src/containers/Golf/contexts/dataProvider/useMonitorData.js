import { useAppData } from "@golfcontexts/dataProvider/AppDataProvider";

const useMonitorData = () => {

    const {
        value: {
            progress,
            count,
            hasError,
            player: { hasPlayerData },
            marker: { hasMarkerData },
            clubs: { hasClubListData },
            bag: { hasBagListData },
            course: { hasCourseListData },
            game: { hasGameListData }
        }
    } = useAppData();

    return {
        progress,
        count,
        hasError,
        hasPlayerData,
        hasMarkerData,
        hasClubListData,
        hasBagListData,
        hasCourseListData,
        hasGameListData
    };
};

export default useMonitorData;
