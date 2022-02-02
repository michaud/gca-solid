const calculateHoleStablefordScore = ({ handicap, si, par, score }) => { 

        let result = 0;

        if(handicap !== undefined && si !== undefined && par !== undefined && score !== undefined && score !== '') {
            
            const baseScore = handicap < 0 ? (par + handicap) + 1 - score : par + 1 - score;
            const lowHoles = handicap % 18;
            const difficultyCorrection = lowHoles >= si ? (handicap - lowHoles) / 18 : (handicap + (18 - lowHoles)) / 18;
            const calculatedScore = baseScore + difficultyCorrection;
            result = calculatedScore > -1 ? calculatedScore : 0;
        }

        return score === '' || score === 0 ? '' : result;
};

export default calculateHoleStablefordScore;
