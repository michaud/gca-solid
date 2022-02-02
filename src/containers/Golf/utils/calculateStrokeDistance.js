const degToRad = ( deg ) => Math.PI * deg / 180;

const getDistance = (lat1, lon1, lat2, lon2, unit) => {

    if ((lat1 === lat2) && (lon1 === lon2)) return 0;

    const radLat1 = degToRad(lat1);
    const radLat2 = degToRad(lat2);
    const theta = lon1 - lon2;
    const radTheta = degToRad(theta);

    let extent = Math.sin(radLat1) *
        Math.sin(radLat2) +
        Math.cos(radLat1) *
        Math.cos(radLat2) *
        Math.cos(radTheta);

    const length = extent > 1 ? 1 : Math.acos(extent) * 180 / Math.PI * 60;

    switch(unit) {

        case 'y' : {
            return (length * 1.1515 * 1760);
        }

        default: {

            return (length * 1.853159616 * 1000);
        }
    }
};

const calculateStrokeDistance = (stroke, hole) => {
    
    if(!hole) return 0;
    if(!stroke) return 0;

    const currStrokeIndex = hole.gameStrokes.value.indexOf(stroke); 
    const nextStrokeIndex = currStrokeIndex !== -1 && currStrokeIndex + 1 < hole.gameStrokes.value.length ? currStrokeIndex + 1 : -1;

    if(nextStrokeIndex !== -1) {
        
        const nextStroke = hole.gameStrokes.value[nextStrokeIndex];

        return Math.round(
            getDistance(
                stroke.strokeLocation.value.latitude.value,
                stroke.strokeLocation.value.longitude.value,
                nextStroke.strokeLocation.value.latitude.value,
                nextStroke.strokeLocation.value.longitude.value
            ));

    } else { return 0; }
};

export default calculateStrokeDistance;
