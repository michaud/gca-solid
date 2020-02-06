import { useState, useEffect } from 'react';
import usePlayer from './usePlayer';
import useMarkers from './useMarkers';
import useClubs from './useClubs';
import useBagClubs from './useBagClubs';
import useCourses from './useCourses';
import useGames from './useGames';
import useClubDefinitions from './useClubDefinitions';

const useDataStructure = (reload, forData = false) => {

    const clubTypeData = useClubDefinitions();
    const playerData = usePlayer(reload);
    const markerData = useMarkers(reload);
    const clubData = useClubs(clubTypeData.clubTypes, clubTypeData.clubType, reload);
    const bagData = useBagClubs(clubTypeData.clubTypes, clubTypeData.clubType, reload);
    const courseData = useCourses(reload);
    const gameData = useGames(clubTypeData.clubTypes, clubTypeData.clubType, reload);

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

    const data = forData ?
        dataFiles.reduce((acc, file) => {

            return ({
                ...acc,
                progress: file.doc !== undefined ? acc.progress + 1 : acc.progress,
                playerData,
                markerData,
                clubData,
                bagData,
                gameData,
                courseData
            })
            
        }, {
            progress: 0,
            playerData: undefined,
            markerData: undefined,
            clubData: undefined,
            bagData: undefined,
            gameData: undefined,
            courseData: undefined
        }) :
        dataFiles.reduce((acc, file) => {

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

    return ({ count,
        ...data
    });
};

export default useDataStructure;
