import { useAppData } from "@golfcontexts/dataProvider/AppDataProvider";

const useMonitorData = () => {

    const {
        value: {
            progress,
            count,
            hasError,
            player: { hasPlayerDetails },
            marker: { hasMarkers },
            clubs: { hasClubs },
            bag: { hasBagClubs },
            course: { hasCourses },
            game: { hasGames }
        }
    } = useAppData();

    return {
        progress,
        count,
        hasError,
        hasPlayerDetails,
        hasMarkers,
        hasClubs,
        hasBagClubs,
        hasCourses,
        hasGames
    };
};

export default useMonitorData;
