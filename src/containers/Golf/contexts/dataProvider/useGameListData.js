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
                doGameListDataReload
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
        doGameListDataReload
    };
};

export default useGameListData;
