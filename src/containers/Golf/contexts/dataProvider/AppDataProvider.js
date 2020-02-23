import React, {
    createContext,
    useState,
    useEffect,
    useContext
} from 'react'

import usePlayer from '@golfhooks/usePlayer';
import useMarkers from '@golfhooks/useMarkers';
import useClubs from '@golfhooks/useClubs';
import useBagClubs from '@golfhooks/useBagClubs';
import useCourses from '@golfhooks/useCourses';
import useGames from '@golfhooks/useGames';
import useClubDefinitions from '@golfhooks/useClubDefinitions';
import usePublicTypeIndex from '@golfhooks/usePublicTypeIndex';
import useMonitorData from '@golfcontexts/dataProvider/useMonitorData';
import usePlayerData from '@golfcontexts/dataProvider/usePlayerData';
import useClubData from '@golfcontexts/dataProvider/useClubData';
import useCourseData from '@golfcontexts/dataProvider/useCourseData';
import useGameListData from '@golfcontexts/dataProvider/useGameListData';
import useGameEditData from '@golfcontexts/dataProvider/useGameEditData';

const AppDataContext = createContext();

const useAppData = () => {

    const context = useContext(AppDataContext)

    if (context === undefined) {

        throw new Error('useCountState must be used within a CountProvider')
    }

    return context
};

const AppDataProvider = ({ children }) => {

    const [reload] = useState(false);

    const [{
        publicTypeIndex,
        publicTypeIndexIsLoading,
        publicTypeIndexIsError
    }, doPublicTypeIndexReload] = usePublicTypeIndex(reload);

    const [{
        clubDefinitions,
        isLoading: clubDefinitionsIsLoading,
        isError: clubDefinitionsIsError
    }] = useClubDefinitions();

    const [{
        playerData,
        isLoading: playerDataIsLoading,
        isError: playerDataIsError
    }, reloadPlayer] = usePlayer(publicTypeIndex);

    const [{
        markerListData,
        isLoading: markerDataIsLoading,
        isError: markerListDataIsError
    }, reloadMarkers] = useMarkers(publicTypeIndex, reload);

    const [{
        clubListData,
        isLoading: clubListDataIsLoading,
        isError: clubListDataIsError
    }, reloadClubs] = useClubs(publicTypeIndex, clubDefinitions.clubTypes, clubDefinitions.clubType, reload);

    const [{
        bagListData,
        isLoading: bagListDataIsLoading,
        isError: bagListDataIsError
    }, reloadBag] = useBagClubs(publicTypeIndex, clubDefinitions.clubTypes, clubDefinitions.clubType, clubListData, reload);

    const [{
        courseListData,
        isLoading: courseListDataIsLoading,
        courseListDataIsError
    }, doCourseListDataReload] = useCourses(publicTypeIndex, reload);

    const [{
        gameListData,
        isLoading: gameListDataIsLoading,
        isError: gameListDataIsError
    }, doGameListDataReload] = useGames(publicTypeIndex, clubDefinitions.clubTypes, clubDefinitions.clubType, clubListData, reload);

    const [dataFiles, setDataFiles] = useState([
        publicTypeIndex,
        clubDefinitions,
        playerData,
        markerListData,
        clubListData,
        bagListData,
        courseListData,
        gameListData
    ]);

    useEffect(() => {

        let didCancel = false;

        if (!didCancel) {

            setDataFiles([
                publicTypeIndex,
                clubDefinitions,
                playerData,
                markerListData,
                clubListData,
                bagListData,
                courseListData,
                gameListData
            ]);
        }

        return () => { didCancel = true; }

    }, [
        publicTypeIndex,
        clubDefinitions,
        playerData,
        markerListData,
        clubListData,
        bagListData,
        courseListData,
        gameListData
    ]);

    const count = dataFiles.length;

    const data = dataFiles.reduce((acc, file) => {

        return ({
            ...acc,
            progress: file.doc !== undefined ? acc.progress + 1 : acc.progress,
            count,
            publicType: {
                publicTypeIndex,
                hasPublicTypeIndexData: publicTypeIndex !== undefined,
                publicTypeIndexIsLoading,
                publicTypeIndexIsError,
                doPublicTypeIndexReload
            },
            clubTypes: {
                clubDefinitions,
                hasClubTypeData: clubDefinitions.clubTypes.length > 0 && clubDefinitions.clubType !== undefined,
                clubDefinitionsIsError,
                clubDefinitionsIsLoading
            },
            player: {
                playerData,
                hasPlayerData: playerData.player !== undefined,
                playerDataIsError,
                playerDataIsLoading,
                reloadPlayer
            },
            marker: {
                markerListData,
                hasMarkerData: markerListData.list.length > 0,
                markerListDataIsError,
                markerDataIsLoading,
                reloadMarkers
            },
            clubs: {
                clubListData,
                hasClubListData: clubListData.list.length > 0,
                clubListDataIsError,
                clubListDataIsLoading,
                reloadClubs
            },
            bag: {
                bagListData,
                hasBagListData: bagListData.list.length > 0,
                bagListDataIsError,
                bagListDataIsLoading,
                reloadBag
            },
            course: {
                courseListData,
                hasCourseListData: courseListData.list.length > 0,
                courseListDataIsError,
                courseListDataIsLoading,
                doCourseListDataReload
            },
            game: {
                gameListData,
                hasGameListData: gameListData.list.length > 0,
                gameListDataIsError,
                gameListDataIsLoading,
                doGameListDataReload
            },
        })

    }, {
        progress: 0,
        count,
        publicType: {
            publicTypeIndex: undefined,
            publicTypeIndexIsLoading,
            publicTypeIndexIsError
        },
        clubTypes: {
            clubDefinitions: undefined,
            hasClubTypeData: false,
            clubDefinitionsIsError,
            clubDefinitionsIsLoading
        },
        player: {
            playerData: undefined,
            hasPlayerData: false,
            playerDataIsError,
            playerDataIsLoading,
            reloadPlayer
        },
        marker: {
            markerListData: undefined,
            hasMarkerData: false,
            markerListDataIsError,
            markerDataIsLoading,
            reloadMarkers
        },
        clubs: {
            clubListData: undefined,
            hasClubListData: false,
            clubListDataIsError,
            clubListDataIsLoading,
            reloadClubs
        },
        bag: {
            bagListData: undefined,
            hasBagListData: false,
            bagListDataIsError,
            bagListDataIsLoading,
            reloadBag
        },
        course: {
            courseListData: undefined,
            hasCourseListData: false,
            courseListDataIsError,
            courseListDataIsLoading,
            doCourseListDataReload
        },
        game: {
            gameListData: undefined,
            hasGameListData: false,
            gameListDataIsError,
            gameListDataIsLoading,
            doGameListDataReload
        }
    });

    const hasError = publicTypeIndexIsError !== undefined ||
        clubDefinitionsIsError !== undefined ||
        playerDataIsError !== undefined ||
        markerListDataIsError !== undefined ||
        clubListDataIsError !== undefined ||
        bagListDataIsError !== undefined ||
        courseListDataIsError !== undefined ||
        gameListDataIsError !== undefined;

    if (hasError) {

        console.log('publicTypeIndexIsError: ', publicTypeIndexIsError);
        console.log('clubDefinitionsIsError: ', clubDefinitionsIsError);
        console.log('playerDataIsError: ', playerDataIsError);
        console.log('markerListDataIsError: ', markerListDataIsError);
        console.log('clubListDataIsError: ', clubListDataIsError);
        console.log('bagListDataIsError: ', bagListDataIsError);
        console.log('courseListDataIsError: ', courseListDataIsError);
        console.log('gameListDataIsError: ', gameListDataIsError);
    }

    const value = {
        ...data,
        hasError
    };

    return (
        <AppDataContext.Provider value={{ value }}>
            { children }
        </AppDataContext.Provider>
    );
};

export {
    AppDataProvider,
    useAppData,
    useMonitorData,
    usePlayerData,
    useClubData,
    useCourseData,
    useGameListData,
    useGameEditData
};
