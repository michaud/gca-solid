import { useAppData } from "@golfcontexts/dataProvider/AppDataProvider";

const usePlayerData = () => {

    const {
        value: {
            progress,
            count,
            hasError,
            player: {
                playerData,
                playerDataIsLoading,
                reloadPlayer
            },
            marker: {
                markerListData,
                reloadMarkers
            }
        }
    } = useAppData();

    return {
        progress,
        count,
        hasError,
        playerData,
        playerDataIsLoading,
        reloadPlayer,
        markerListData,
        reloadMarkers
    };
};

export default usePlayerData;
