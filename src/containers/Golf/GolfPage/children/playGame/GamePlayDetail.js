import React from 'react';

import HoleTable from '@golf/GolfPage/children/hole/HoleTable';
import calculateHoleStablefordScore from '@containers/Golf/utils/calculateHoleStablefordScore';

const GamePlayDetail = ({ gameData }) => {

    if(gameData) {

        const course = gameData.game.gameCourse.value;
        const coursePar = course.courseHoles.value
            .reduce((acc, hole) => acc + hole.holePar.value, 0);

        const totalStablefordScore = course.courseHoles.value
            .reduce((acc, hole) => {
                const si = hole.holeStrokeIndex.value;
                const par = hole.holePar.value;
                const score = hole.gameStrokes.value.length;
            
                return acc + calculateHoleStablefordScore({
                    handicap: gameData.game.gamePlayingHandicap.value.playerPlayingHandicap.value,
                    si,
                    par,
                    score
                })
            }, 0);
        
        return (
            <div className="gameplay-detail">
                <div className="c-box--sixpack gameplay-detail__field">{ course.courseName.value }, par { coursePar }, stblfrd: { totalStablefordScore }</div>
                <HoleTable holes={ course.courseHoles.value }/>
            </div>
        );
    }

    return null;
};

export default GamePlayDetail;
