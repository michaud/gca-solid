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
                reloadPlayer
            },
            marker: {
                markerListData,
                hasMarkerData,
                markerListDataIsError,
                markerDataIsLoading,
                reloadMarkers
            },
            clubs: {
                clubListData,
                hasClubListData,
                clubListDataIsError,
                clubListDataIsLoading,
                reloadClubs
            },
            bag: {
                bagData,
                hasBagData,
                bagDataIsError,
                bagDataIsLoading,
                reloadBag
            },
            course: {
                courseListData,
                hasCourseListData,
                courseListDataIsError,
                courseListDataIsLoading,
                reloadCourses
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
        reloadPlayer,
        markerListData,
        hasMarkerData,
        markerListDataIsError,
        markerDataIsLoading,
        reloadMarkers,
        clubListData,
        hasClubListData,
        clubListDataIsError,
        clubListDataIsLoading,
        reloadClubs,
        bagData,
        hasBagData,
        bagDataIsError,
        bagDataIsLoading,
        reloadBag,
        courseListData,
        hasCourseListData,
        courseListDataIsError,
        courseListDataIsLoading,
        reloadCourses
    };
};

export default useGameEditData;
