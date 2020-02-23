import React from 'react';

const HoleTable = ({
    holes,
    onEditHole
}) => {

    const editHoleHandler = index => () => onEditHole && onEditHole(index);

    const outHoles = holes.slice(0, 9);
    const outHolesEmpty = Array(9 - outHoles.length).fill(0);
    const inHoles = holes.slice(9, holes.length);
    const inHolesEmpty = Array(9 - inHoles.length).fill(0);

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
        <div className="c-box">
            <label className="f-label--plain">holes</label>
            <table className="hole-table u-wide">
                <tbody>
                    <tr>
                        { outHoleNumbers.map((nr, index) => <th className="hole-table__header--button" onClick={ editHoleHandler(index) } key={ index }><span>{ nr }</span></th>) }
                        { outHolesEmpty.map((nr, index) => <th className="hole-table__header--empty" key={ index }><span></span></th>) }
                    </tr>
                    <tr>
                        { outPars.map((p, index) => <td key={ index }>{ p }</td>) }
                        { outHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                    <tr>
                        { outGameStrokes.map((s, index) => <td key={ index }>{ s }</td>) }
                        { outHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                    <tr>
                        { outStrokeIndices.map((s, index) => <td className={ s === 0 ? 'invalid' : '' } key={ index }>{ s }</td>) }
                        { outHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                    <tr>
                        { outLengths.map((l, index) => <td key={ index }>{ l }</td>) }
                        { outHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                </tbody>
            </table>
            { outHoles.length === 9 ? <table className="hole-table u-wide">
                <tbody>
                    <tr>
                        { inHoleNumbers.map((nr, index) => <th className="hole-table__header--button" key={ index }>{ nr }</th>) }
                        { inHolesEmpty.map((nr, index) => <th className="hole-table__header--empty" key={ index }><span></span></th>) }
                    </tr>
                    <tr>
                        { inPars.map((p, index) => <td key={ index }>{ p }</td>) }
                        { inHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                    <tr>
                        { inGameStrokes.map((s, index) => <td key={ index }>{ s }</td>) }
                        { inHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                    <tr>
                        { inStrokeIndices.map((s, index) => <td className={ s === 0 ? 'invalid' : '' } key={ index }>{ s }</td>) }
                        { inHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                    <tr>
                        { inLengths.map((l, index) => <td key={ index }>{ l }</td>) }
                        { inHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                </tbody>
            </table> : null }
        </div>
    );
};

export default HoleTable;
