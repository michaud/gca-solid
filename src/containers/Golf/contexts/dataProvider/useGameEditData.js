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
                bagListData,
                hasBagListData,
                bagListDataIsError,
                bagListDataIsLoading,
                doBagListDataReload
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
        bagListData,
        hasBagListData,
        bagListDataIsError,
        bagListDataIsLoading,
        doBagListDataReload,
        courseListData,
        hasCourseListData,
        courseListDataIsError,
        courseListDataIsLoading,
        doCourseListDataReload
    };
};

export default useGameEditData;
