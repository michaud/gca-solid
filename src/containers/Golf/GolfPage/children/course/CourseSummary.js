import React from 'react';

import HoleTable from '@golf/GolfPage/children/hole/HoleTable';
import {
    FlexContainer,
    FlexItemLabel,
    FlexItemValue
} from '@containers/Golf/styles/layout.style';

const CourseSummary = ({ course }) => {

    return (
        <div>
            <header className="c-header nudge">Course</header>
            <div className="c-box">
                <FlexContainer>
                    <FlexItemLabel>Name</FlexItemLabel>
                    <FlexItemValue>{ `${ course.courseName.value }`}</FlexItemValue>
                </FlexContainer>
                <FlexContainer>
                    <FlexItemLabel>Slope</FlexItemLabel>
                    <FlexItemValue>{ `${ course.courseSlope.value }`}</FlexItemValue>
                </FlexContainer>
            </div>
            <div className="c-box">
                <label className="f-label--plain">holes</label>
                <HoleTable holes={ course.courseHoles.value }/>
            </div>
        </div>
    );
};

export default CourseSummary;
