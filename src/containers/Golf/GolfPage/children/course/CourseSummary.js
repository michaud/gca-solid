import React from 'react';

import HoleTable from '@golf/GolfPage/children/hole/HoleTable';

const CourseSummary = ({ course }) => {
    return (
        <div>
            <HoleTable holes={ course.courseHoles.value }/>
        </div>
    );
};

export default CourseSummary;
