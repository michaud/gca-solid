import golf from "@golfutils/golf-namespace";

import getSimpleLiteral from "./getField/getSimpleLiteral";
import getHolesField from "./getField/getHolesField";
import getClubField from "./getField/getClubField";
import getBagField from "./getField/getBagField";
import getPlayerField from "./getField/getPlayerField";
import getMarkerField from "./getField/getMarkerField";
import getCourseField from "./getField/getCourseField";
import getStrokesField from "./getField/getStrokesField";
import getGamePlayingHandicapField from "./getField/getGamePlayingHandicapField";
import getClubsField from "./getField/getClubsField";
import getGameCourseField from "./getField/getGameCourseField";
import getGeoCoordinatesField from "./getField/getGeoCoordinatesField";
import getStrokeClubField from "./getField/getStrokeClubField";

const getFieldTypeData = {
    [golf.types.string]: getSimpleLiteral,
    [golf.types.nonNegativeInteger]: getSimpleLiteral,
    [golf.types.text]: getSimpleLiteral,
    [golf.types.integer]: getSimpleLiteral,
    [golf.types.double]: getSimpleLiteral,
    [golf.types.dateTime]: getSimpleLiteral,
    [golf.classes.Hole]: getHolesField,
    [golf.classes.Club]: getClubField,
    [golf.classes.Bag]: getBagField,
    [golf.classes.Player]: getPlayerField,
    [golf.classes.Marker]: getMarkerField,
    [golf.classes.Course]: getCourseField,
    [golf.classes.Stroke]: getStrokesField,
    [golf.classes.GamePlayingHandicap]: getGamePlayingHandicapField,
    [golf.properties.clubs]: getClubsField,
    [golf.properties.gameCourse]: getGameCourseField,
    [golf.properties.strokeClub]: getStrokeClubField,
    [golf.types.GeoCoordinates]: getGeoCoordinatesField
};

export default getFieldTypeData;
