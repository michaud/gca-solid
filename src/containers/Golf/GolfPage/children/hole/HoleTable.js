import React from 'react';

const HoleTable = ({
    holes,
    onEditHole
}) => {

    const editHoleHandler = index => () => onEditHole && onEditHole(index);

    const outHoles = holes.slice(0, 9);
    const inHoles = holes.slice(9, holes.length);
    const outHoleNumbers = outHoles.map(nr => nr.holeNumber.value);
    const outPars = outHoles.map(par => par.holePar.value);
    const outLengths = outHoles.map(length => length.holeLength.value);
    const outStrokeIndices = outHoles.map(length => length.holeStrokeIndex.value);
    const inHoleNumbers = inHoles.map(nr => nr.holeNumber.value);
    const inPars = inHoles.map(par => par.holePar.value);
    const inLengths = inHoles.map(length => length.holeLength.value);
    const inStrokeIndices = inHoles.map(length => length.holeStrokeIndex.value);

    return (
        <>
            <div className="f-label--row">holes</div>
            <table className="hole-table">
                <tbody>
                    <tr>
                        { outHoleNumbers.map((nr, index) => <th className="hole-table__header--button" onClick={ editHoleHandler(index) } key={ index }>{ nr }</th>) }
                    </tr>
                    <tr>
                        { outPars.map((p, index) => <td key={ index}>{ p }</td>) }
                    </tr>
                    <tr>
                        { outStrokeIndices.map((s, index) => <td key={ index}>{ s }</td>) }
                    </tr>
                    <tr>
                        { outLengths.map((l, index) => <td key={ index}>{ l }</td>) }
                    </tr>
                </tbody>
            </table>
            <table className="hole-table">
                <tbody>
                    <tr>
                        { inHoleNumbers.map((nr, index) => <th className="hole-table__header--button" key={ index}>{ nr }</th>) }
                    </tr>
                    <tr>
                        { inPars.map((p, index) => <td key={ index}>{ p }</td>) }
                    </tr>
                    <tr>
                        { inStrokeIndices.map((s, index) => <td key={ index}>{ s }</td>) }
                    </tr>
                    <tr>
                        { inLengths.map((l, index) => <td key={ index}>{ l }</td>) }
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default HoleTable;
