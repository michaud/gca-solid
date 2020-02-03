import { useState, useEffect } from 'react';
import usePlayer from './usePlayer';
import useMarkers from './useMarkers';
import useClubs from './useClubs';
import useBagClubs from './useBagClubs';
import useCourses from './useCourses';
import useGames from './useGames';
import useClubDefinitions from './useClubDefinitions';

const useDataStructure = (reload) => {

    const clubTypeDefinitions = useClubDefinitions();
    const clubTypeDefs = clubTypeDefinitions || { clubTypes: [], clubType: null };

    const playerData = usePlayer(reload);
    const markerData = useMarkers(reload);
    const clubData = useClubs(clubTypeDefs.clubTypes, clubTypeDefs.clubType, reload);
    const bagData = useBagClubs(clubTypeDefs.clubTypes, clubTypeDefs.clubType, reload);
    const courseData = useCourses(reload);
    const gameData = useGames(clubTypeDefs.clubTypes, clubTypeDefs.clubType, reload);

    const [dataFiles, setDataFiles] = useState([
        playerData,
        markerData,
        clubData,
        bagData,
        courseData,
        gameData
    ]);

    useEffect(() => {

        setDataFiles([
            playerData,
            markerData,
            clubData,
            bagData,
            courseData,
            gameData
        ])

    }, [
        playerData,
        markerData,
        clubData,
        bagData,
        gameData,
        courseData
    ]);

    const count = dataFiles.length;

    const data = dataFiles.reduce((acc, file) => {

        return ({
            ...acc,
            progress: file.doc !== undefined ? acc.progress + 1 : acc.progress,
            hasPlayerData: playerData.player !== undefined,
            hasMarkerData: markerData.list.length > 0,
            hasClubData: clubData.list.length > 0,
            hasBagData: bagData.list.length > 0,
            hasGameData: gameData.list.length > 0,
            hasCourseData: courseData.list.length > 0
        })
        
    }, {
        progress: 0,
        hasPlayerData: undefined,
        hasMarkerData: undefined,
        hasClubData: undefined,
        hasBagData: undefined,
        hasGameData: undefined,
        hasCourseData: undefined
    });

    return { count,
        data
    };
};

export default useDataStructure;
