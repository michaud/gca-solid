import React from 'react';

import HoleTable from '@containers/Golf/GolfPage/children/hole/HoleTable';

const CourseSummary = ({ course }) => {
    return (
        <div>
            <HoleTable holes={ course.courseHoles.value }/>
        </div>
    );
};

export default CourseSummary;
