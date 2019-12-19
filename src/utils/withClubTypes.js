import React from 'react';

import useClubTypes from "@hooks/useClubTypes";

const withClubTypes = (Component) => (props) => {

    const clubTypes = useClubTypes();

    return <Component clubTypes={ clubTypes } {...props} />;
}

export default withClubTypes;
