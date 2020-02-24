import { useAppData } from "@golfcontexts/dataProvider/AppDataProvider";

const useGameEditData = () => {

    const {
        value: {
            progress,
            count,
            hasError,
            clubTypes: {
                clubDefinitions,
                hasClubTypeData,
                clubDefinitionsIsError,
                clubDefinitionsIsLoading
            },
            player: {
                playerData,
                hasPlayerData,
                playerDataIsError,
                playerDataIsLoading,
                doPlayerReload
            },
            marker: {
                markerListData,
                hasMarkerData,
                markerListDataIsError,
                markerDataIsLoading,
                doMarkerListDataReload
            },
            clubs: {
                clubListData,
                hasClubListData,
                clubListDataIsError,
                clubListDataIsLoading,
                doClubListDataReload
            },
            bag: {
                bagData,
                hasBagData,
                bagDataIsError,
                bagDataIsLoading,
                dobagDataReload
            },
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
        clubDefinitions,
        hasClubTypeData,
        clubDefinitionsIsError,
        clubDefinitionsIsLoading,
        playerData,
        hasPlayerData,
        playerDataIsError,
        playerDataIsLoading,
        doPlayerReload,
        markerListData,
        hasMarkerData,
        markerListDataIsError,
        markerDataIsLoading,
        doMarkerListDataReload,
        clubListData,
        hasClubListData,
        clubListDataIsError,
        clubListDataIsLoading,
        doClubListDataReload,
        bagData,
        hasBagData,
        bagDataIsError,
        bagDataIsLoading,
        dobagDataReload,
        courseListData,
        hasCourseListData,
        courseListDataIsError,
        courseListDataIsLoading,
        doCourseListDataReload
    };
};

export default useGameEditData;
