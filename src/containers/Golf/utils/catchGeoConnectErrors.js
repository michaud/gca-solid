const catchGeoConnectErrors = (error) => {

    console.error(error.message);
    let msg = null;

    switch(error.code) {

        case error.PERMISSION_DENIED:

            msg = "User denied the request for Geolocation.";
            break;

      case error.POSITION_UNAVAILABLE:

            msg = "Location information is unavailable.";
            break;

      case error.TIMEOUT:

            msg = "The request to get user location timed out.";
            break;

      case error.UNKNOWN_ERROR:

            msg = "An unknown error occurred.";
            break;

        default:

            break;
    }

    alert(msg);
};

export default catchGeoConnectErrors;
