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
                bagListData,
                bagListDataIsLoading,
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
        bagListData,
        reloadBag,
        bagListDataIsLoading
    };
};

export default useClubData;
