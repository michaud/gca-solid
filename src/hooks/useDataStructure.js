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

    const progress = dataFiles.reduce((acc, file) => file.doc !== undefined ? acc + 1 : acc, 0);

    return { count,
        progress
    };
};

export default useDataStructure;
