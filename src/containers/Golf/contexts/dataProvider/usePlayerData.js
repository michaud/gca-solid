import { useAppData } from "@golfcontexts/dataProvider/AppDataProvider";

const usePlayerData = () => {

    const {
        value: {
            progress,
            count,
            hasError,
            player: { playerData,
                playerDataIsLoading
            },
            marker: { markerListData }
        }
    } = useAppData();

    return {
        progress,
        count,
        hasError,
        playerData,
        playerDataIsLoading,
        markerListData
    };
};

export default usePlayerData;
