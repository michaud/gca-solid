import golf from '@golfutils/golf-namespace';

import courseShape from '@golfcontexts/course-shape.json';
import playerShape from '@golfcontexts/player-shape.json';
import markerShape from '@golfcontexts/marker-shape.json';
import gameShape from '@golfcontexts/game-shape.json';
import clubShape from '@golfcontexts/club-shape.json';
import holeShape from '@golfcontexts/hole-shape.json';
import playingHandicapShape from '@golfcontexts/playing-handicap-shape.json';
import gameHoleShape from '@golfcontexts/game-hole-shape.json';
import strokeShape from '@golfcontexts/stroke-shape.json';
import geoCoordinatesShape from '@golfcontexts/geocoordinates-shape.json';

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
