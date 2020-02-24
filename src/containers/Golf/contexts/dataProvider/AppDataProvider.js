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

    const [{
        publicTypeIndex,
        isLoading: publicTypeIndexIsLoading,
        isError: publicTypeIndexIsError
    }, reloadPublicTypeIndex] = usePublicTypeIndex();

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
    }, reloadMarkers] = useMarkers(publicTypeIndex);

    const [{
        clubListData,
        isLoading: clubListDataIsLoading,
        isError: clubListDataIsError
    }, reloadClubs] = useClubs(publicTypeIndex, clubDefinitions.clubTypes, clubDefinitions.clubType);

    const [{
        bagData,
        isLoading: bagDataIsLoading,
        isError: bagDataIsError
    }, reloadBag] = useBagClubs(publicTypeIndex, clubDefinitions.clubTypes, clubDefinitions.clubType, clubListData);

    const [{
        courseListData,
        isLoading: courseListDataIsLoading,
        courseListDataIsError
    }, reloadCourses] = useCourses(publicTypeIndex);

    const [{
        gameListData,
        isLoading: gameListDataIsLoading,
        isError: gameListDataIsError
    }, reloadGames] = useGames(publicTypeIndex, clubDefinitions.clubTypes, clubDefinitions.clubType, clubListData);

    const [dataFiles, setDataFiles] = useState([
        publicTypeIndex,
        clubDefinitions,
        playerData,
        markerListData,
        clubListData,
        bagData,
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
                bagData,
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
        bagData,
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
                reloadPublicTypeIndex
            },
            clubTypes: {
                clubDefinitions,
                hasClubTypeData: clubDefinitions.clubTypes.length > 0 && clubDefinitions.clubType !== undefined,
                clubDefinitionsIsError,
                clubDefinitionsIsLoading
            },
            player: {
                playerData,
                hasPlayerData: playerData.doc !== undefined,
                hasPlayerDetails: playerData.player !== undefined,
                playerDataIsError,
                playerDataIsLoading,
                reloadPlayer
            },
            marker: {
                markerListData,
                hasMarkerData: markerListData.doc  !== undefined,
                hasMarkers: markerListData.list.length > 0,
                markerListDataIsError,
                markerDataIsLoading,
                reloadMarkers
            },
            clubs: {
                clubListData,
                hasClubListData: clubListData.doc !== undefined,
                hasClubs: clubListData.list.length > 0,
                clubListDataIsError,
                clubListDataIsLoading,
                reloadClubs
            },
            bag: {
                bagData,
                hasBagData: bagData.doc !== undefined,
                hasBagClubs: bagData && bagData.clubs && bagData.clubs.value.length > 0,
                bagDataIsError,
                bagDataIsLoading,
                reloadBag
            },
            course: {
                courseListData,
                hasCourseListData: courseListData.doc !== undefined,
                hasCourses: courseListData.list.length > 0,
                courseListDataIsError,
                courseListDataIsLoading,
                reloadCourses
            },
            game: {
                gameListData,
                hasGameListData: gameListData.doc !== undefined,
                hasGames: gameListData.list.length > 0,
                gameListDataIsError,
                gameListDataIsLoading,
                reloadGames
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
            hasPlayerDetails: false,
            playerDataIsError,
            playerDataIsLoading,
            reloadPlayer
        },
        marker: {
            markerListData: undefined,
            hasMarkerData: false,
            hasMarkers: false,
            markerListDataIsError,
            markerDataIsLoading,
            reloadMarkers
        },
        clubs: {
            clubListData: undefined,
            hasClubListData: false,
            hasClubs: false,
            clubListDataIsError,
            clubListDataIsLoading,
            reloadClubs
        },
        bag: {
            bagData: undefined,
            hasBagData: false,
            hasBagClubs: false,
            bagDataIsError,
            bagDataIsLoading,
            reloadBag
        },
        course: {
            courseListData: undefined,
            hasCourseListData: false,
            hasCourses: false,
            courseListDataIsError,
            courseListDataIsLoading,
            reloadCourses
        },
        game: {
            gameListData: undefined,
            hasGameListData: false,
            hasGames: false,
            gameListDataIsError,
            gameListDataIsLoading,
            reloadGames
        }
    });

    const hasError = publicTypeIndexIsError !== undefined ||
        clubDefinitionsIsError !== undefined ||
        playerDataIsError !== undefined ||
        markerListDataIsError !== undefined ||
        clubListDataIsError !== undefined ||
        bagDataIsError !== undefined ||
        courseListDataIsError !== undefined ||
        gameListDataIsError !== undefined;

    if (hasError) {

        console.log('publicTypeIndexIsError: ', publicTypeIndexIsError);
        console.log('clubDefinitionsIsError: ', clubDefinitionsIsError);
        console.log('playerDataIsError: ', playerDataIsError);
        console.log('markerListDataIsError: ', markerListDataIsError);
        console.log('clubListDataIsError: ', clubListDataIsError);
        console.log('bagDataIsError: ', bagDataIsError);
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
