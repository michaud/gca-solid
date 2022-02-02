import { useAppData } from "@golfcontexts/dataProvider/AppDataProvider";

const useGameListData = () => {

    const {
        value: {
            progress,
            count,
            hasError,
            clubTypes: {
                clubDefinitions
            },
            game: {
                gameListData,
                hasGameListData,
                gameListDataIsError,
                gameListDataIsLoading,
                reloadGames
            }
        }
    } = useAppData();

    return {
        progress,
        count,
        hasError,
        clubDefinitions,
        gameListData,
        hasGameListData,
        gameListDataIsError,
        gameListDataIsLoading,
        reloadGames
    };
};

export default useGameListData;
