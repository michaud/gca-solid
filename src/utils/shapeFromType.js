import golf from '@utils/golf-namespace';

import courseShape from '@contexts/course-shape.json';
import playerShape from '@contexts/player-shape.json';
import markerShape from '@contexts/marker-shape.json';
import gameShape from '@contexts/game-shape.json';
import clubShape from '@contexts/club-shape.json';

const shapeFromType = {
    [golf.classes.Course]:courseShape,
    [golf.classes.Player]:playerShape,
    [golf.classes.Marker]:markerShape,
    [golf.classes.Game]:gameShape,
    [golf.classes.Club]:clubShape
};

export default shapeFromType;
