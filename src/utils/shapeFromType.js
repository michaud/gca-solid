import golf from '@utils/golf-namespace';

import courseShape from '@contexts/course-shape.json';
import playerShape from '@contexts/player-shape.json';
import markerShape from '@contexts/marker-shape.json';
import gameShape from '@contexts/game-shape.json';
import clubShape from '@contexts/club-shape.json';
import holeShape from '@contexts/hole-shape.json';
import playingHandicapShape from '@contexts/playing-handicap-shape.json';
import gameHoleShape from '@contexts/game-hole-shape.json';
import strokeShape from '@contexts/stroke-shape.json';
import geoCoordinatesShape from '@contexts/geocoordinates-shape.json';

const shapeFromType = {
    [golf.classes.Course]:courseShape,
    [golf.classes.Player]:playerShape,
    [golf.classes.Marker]:markerShape,
    [golf.classes.Game]:gameShape,
    [golf.classes.Club]:clubShape,
    [golf.classes.Hole]:holeShape,
    [golf.classes.GamePlayingHandicap]:playingHandicapShape,
    [golf.classes.GameHole]:gameHoleShape,
    [golf.classes.Stroke]:strokeShape,
    [golf.types.GeoCoordinates]:geoCoordinatesShape
};

export default shapeFromType;
