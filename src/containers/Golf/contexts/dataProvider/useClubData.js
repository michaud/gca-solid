import { useAppData } from "@golfcontexts/dataProvider/AppDataProvider";

const useClubData = () => {

    const {
        value: {
            progress,
            count,
            hasError,
            clubTypes: {
                clubDefinitions
            },
            clubs: {
                clubListData,
                clubListDataIsLoading,
                reloadClubs
            },
            bag: {
                bagData,
                bagDataIsLoading,
                reloadBag
            }
        }
    } = useAppData();

    return {
        progress,
        count,
        hasError,
        clubDefinitions,
        clubListData,
        reloadClubs,
        clubListDataIsLoading,
        bagData,
        reloadBag,
        bagDataIsLoading
    };
};

export default useClubData;
