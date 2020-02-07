import { useState, useEffect } from 'react';
import usePlayer from './usePlayer';
import useMarkers from './useMarkers';
import useClubs from './useClubs';
import useBagClubs from './useBagClubs';
import useCourses from './useCourses';
import useGames from './useGames';
import useClubDefinitions from './useClubDefinitions';

const useDataStructure = (initialReload, forData = false) => {

    const [reload] = useState(initialReload)

    const clubTypeData = useClubDefinitions();

    const [{
        playerData,
        isError: playerDataIsError
    }] = usePlayer(reload);

    const [{
        markerListData,
        isError: markerListDataIsError
    }] = useMarkers(reload);

    const [{
        clubListData,
        isError: clubListDataIsError
    }] = useClubs(clubTypeData.clubTypes, clubTypeData.clubType, reload);

    const [{
        bagListData,
        isError: bagListDataIsError
    }] = useBagClubs(clubTypeData.clubTypes, clubTypeData.clubType, reload);

    const [{
        courseListData,
        courseListDataIsError
    }] = useCourses(reload);

    const [{
        gameListData,
        isError: gameListDataIsError
    }] = useGames(clubTypeData.clubTypes, clubTypeData.clubType, reload);

    const [dataFiles, setDataFiles] = useState([
        playerData,
        markerListData,
        clubListData,
        bagListData,
        courseListData,
        gameListData
    ]);

    useEffect(() => {

        let didCancel = false;

        if(!didCancel) {

            setDataFiles([
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
        playerData,
        markerListData,
        clubListData,
        bagListData,
        gameListData,
        courseListData
    ]);

    const count = dataFiles.length;

    const data = forData ?
        dataFiles.reduce((acc, file) => {

            return ({
                ...acc,
                progress: file.doc !== undefined ? acc.progress + 1 : acc.progress,
                playerData,
                markerListData,
                clubListData,
                bagListData,
                gameListData,
                courseListData
            })
            
        }, {
            progress: 0,
            playerData: undefined,
            markerListData: undefined,
            clubListData: undefined,
            bagListData: undefined,
            gameListData: undefined,
            courseListData: undefined
        }) :
        dataFiles.reduce((acc, file) => {

            return ({
                ...acc,
                progress: file.doc !== undefined ? acc.progress + 1 : acc.progress,
                hasPlayerData: playerData.player !== undefined,
                hasMarkerData: markerListData.list.length > 0,
                hasClubListData: clubListData.list.length > 0,
                hasBagListData: bagListData.list.length > 0,
                hasGameListData: gameListData.list.length > 0,
                hasCourseListData: courseListData.list.length > 0
            })
            
        }, {
            progress: 0,
            hasPlayerData: undefined,
            hasMarkerData: undefined,
            hasClubListData: undefined,
            hasBagListData: undefined,
            hasGameListData: undefined,
            hasCourseListData: undefined
        });

    const hasError = playerDataIsError ||
        markerListDataIsError ||
        clubListDataIsError ||
        bagListDataIsError ||
        courseListDataIsError ||
        gameListDataIsError;

    return ({ count,
        ...data,
        hasError
    });
};

export default useDataStructure;
