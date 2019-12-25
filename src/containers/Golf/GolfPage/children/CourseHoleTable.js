import React from 'react';

const CourseHoleTable = ({ holes }) => {

    const holeNumbers = holes.map(nr => nr.fields.holeNumber.field.value);
    const pars = holes.map(par => par.fields.holePar.field.value);
    const lengths = holes.map(length => length.fields.holeLength.field.value);
    return (
        <>
            <div className="f-label--row">holes</div>
            <table className="hole-table">
                <tbody>
                    <tr>
                        <td>hole</td>{ holeNumbers.map((nr, index) => <th key={ index}>{ nr }</th>) }
                    </tr>
                    <tr>
                        <td>par</td>{ pars.map((p, index) => <td key={ index}>{ p }</td>) }
                    </tr>
                    <tr>
                        <td>length</td>{ lengths.map((l, index) => <td key={ index}>{ l }</td>) }
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default CourseHoleTable;
