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
                clubListDataIsLoading
            },
            bag: {
                bagListData,
                bagListDataIsLoading
            }
        }
    } = useAppData();

    return {
        progress,
        count,
        hasError,
        clubDefinitions,
        clubListData,
        clubListDataIsLoading,
        bagListData,
        bagListDataIsLoading
    };
};

export default useClubData;
