import React from 'react';

const HoleTable = ({
    holes,
    onEditHole
}) => {

    const editHoleHandler = index => () => onEditHole && onEditHole(index);

    const outHoles = holes.slice(0, 9);
    const inHoles = holes.slice(9, holes.length);

    const outHoleNumbers = outHoles.map(hole => hole.holeNumber.value);
    const outPars = outHoles.map(hole => hole.holePar.value);
    const outLengths = outHoles.map(hole => hole.holeLength.value);
    const outStrokeIndices = outHoles.map(hole => hole.holeStrokeIndex.value);
    const outGameStrokes = outHoles.map(hole => hole.gameStrokes ? hole.gameStrokes.value.length > 0 ? hole.gameStrokes.value.length : '' : '');
    const inHoleNumbers = inHoles.map(hole => hole.holeNumber.value);
    const inPars = inHoles.map(hole => hole.holePar.value);
    const inLengths = inHoles.map(hole => hole.holeLength.value);
    const inStrokeIndices = inHoles.map(hole => hole.holeStrokeIndex.value);
    const inGameStrokes = inHoles.map(hole => hole.gameStrokes ? hole.gameStrokes.value.length > 0 ? hole.gameStrokes.value.length : '' : '');

    return (
        <div>
            <header className="c-header">holes</header>
            <table className={ holes.length > 8 ? 'hole-table u-wide' : 'hole-table' }>
                <tbody>
                    <tr>
                        { outHoleNumbers.map((nr, index) => <th className="hole-table__header--button" onClick={ editHoleHandler(index) } key={ index }>{ nr }</th>) }
                    </tr>
                    <tr>
                        { outPars.map((p, index) => <td key={ index}>{ p }</td>) }
                    </tr>
                    <tr>
                        { outGameStrokes.map((s, index) => <td key={ index}>{ s }</td>) }
                    </tr>
                    <tr>
                        { outStrokeIndices.map((s, index) => <td key={ index}>{ s }</td>) }
                    </tr>
                    <tr>
                        { outLengths.map((l, index) => <td key={ index}>{ l }</td>) }
                    </tr>
                </tbody>
            </table>
            <table className={ holes.length > 8 ? 'hole-table u-wide' : 'hole-table' }>
                <tbody>
                    <tr>
                        { inHoleNumbers.map((nr, index) => <th className="hole-table__header--button" key={ index}>{ nr }</th>) }
                    </tr>
                    <tr>
                        { inPars.map((p, index) => <td key={ index}>{ p }</td>) }
                    </tr>
                    <tr>
                        { inGameStrokes.map((s, index) => <td key={ index}>{ s }</td>) }
                    </tr>
                    <tr>
                        { inStrokeIndices.map((s, index) => <td key={ index}>{ s }</td>) }
                    </tr>
                    <tr>
                        { inLengths.map((l, index) => <td key={ index}>{ l }</td>) }
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default HoleTable;
