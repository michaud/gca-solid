import { useAppData } from "@golfcontexts/dataProvider/AppDataProvider";

const useMonitorData = () => {

    const {
        value: {
            progress,
            count,
            hasError,
            player: {
                hasPlayerDetails,
                playerDataIsError
            },
            marker: {
                hasMarkers,
                markerListDataIsError
            },
            clubs: {
                hasClubs,
                clubListDataIsError
            },
            bag: {
                hasBagClubs,
                bagDataIsError
            },
            course: {
                hasCourses,
                courseListDataIsError
            },
            game: {
                hasGames,
                gameListDataIsError
            }
        }
    } = useAppData();

    const errors = [
        playerDataIsError,
        markerListDataIsError,
        clubListDataIsError,
        bagDataIsError,
        courseListDataIsError,
        gameListDataIsError
    ];

    return {
        progress,
        count,
        hasError,
        errors,
        hasPlayerDetails,
        hasMarkers,
        hasClubs,
        hasBagClubs,
        hasCourses,
        hasGames
    };
};

export default useMonitorData;
