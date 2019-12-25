import React from 'react';
import HoleDetail from './HoleDetail';

const HoleList = ({ holes, listTitle}) => {

    return <><header className="c-header--sec">{ listTitle }</header>
    {
        holes.length > 0 ? holes.map((hole, index) => <HoleDetail key={ index } hole={ hole }/>) :
        <div className="hole-list--item">Add a hole</div>
    }
    </>
}

export default HoleList;
