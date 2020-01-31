import { useState, useEffect } from 'react';
import usePlayer from './usePlayer';
import useMarkers from './useMarkers';
import useClubs from './useClubs';
import useBagClubs from './useBagClubs';
import useCourses from './useCourses';
import useGames from './useGames';

const useDataStructure = () => {

    const playerData = usePlayer();
    const markerData = useMarkers();
    const clubData = useClubs();
    const bagData = useBagClubs();
    const courseData = useCourses();
    const gameData = useGames();

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
        ...data
    };
};

export default useDataStructure;
