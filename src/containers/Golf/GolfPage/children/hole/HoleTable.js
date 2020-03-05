import React from 'react';
import calculateHoleStablefordScore from '@golfutils/calculateHoleStablefordScore';

const getStrokeDisplayText = (playingHandicap, strokeField) => hole => {
    
    const strokeData = hole[strokeField] ? hole[strokeField].value : '';

    const strokeValue = Array.isArray(strokeData) ?
        strokeData.length : strokeData;

    const playerStablefordScore = calculateHoleStablefordScore({
        handicap: playingHandicap && playingHandicap.value,
        si: hole.holeStrokeIndex.value,
        par: hole.holePar.value,
        score: strokeValue
    });

    return strokeValue !== '' && strokeValue !== 0 ? `${ strokeValue }/${ playerStablefordScore }` : '';
};

const HoleTable = ({
    holes = [],
    playingHandicap,
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
    const outGameStrokes = outHoles.map(getStrokeDisplayText(playingHandicap && playingHandicap.playerPlayingHandicap, 'gameStrokes'));
    const outGameMarkerStrokes = outHoles.map(getStrokeDisplayText(playingHandicap && playingHandicap.playerPlayingHandicap, 'gameMarkerStrokeCount'));
    const inHoleNumbers = inHoles.map(hole => hole.holeNumber.value);
    const inPars = inHoles.map(hole => hole.holePar.value);
    const inLengths = inHoles.map(hole => hole.holeLength.value);
    const inStrokeIndices = inHoles.map(hole => hole.holeStrokeIndex.value);
    const inGameStrokes = inHoles.map(getStrokeDisplayText(playingHandicap && playingHandicap.playerPlayingHandicap, 'gameStrokes'));
    const inGameMarkerStrokes = inHoles.map(getStrokeDisplayText(playingHandicap && playingHandicap.playerPlayingHandicap, 'gameMarkerStrokeCount'));

    return (
        <>
            <table className="hole-table u-wide">
                <tbody>
                    <tr>
                        { outHoleNumbers.map((nr, index) => <th className={ `${ onEditHole ? 'hole-table__header--button' : 'hole-table__header--empty' }` } onClick={ editHoleHandler(index) } key={ index }><span>{ nr }</span></th>) }
                        { outHolesEmpty.map((nr, index) => <th className="hole-table__header--empty" key={ index }><span></span></th>) }
                    </tr>
                    <tr className="t-row--par">
                        { outPars.map((p, index) => <td key={ index }>{ p }</td>) }
                        { outHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                    <tr className="t-row--player-score">
                        { outGameStrokes.map((s, index) => <td className="hole-table__cell--score" key={ index }>{ s }</td>) }
                        { outHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                    <tr className="t-row--marker-score">
                        { outGameMarkerStrokes.map((s, index) => <td className="hole-table__cell--score" key={ index }>{ s }</td>) }
                        { outHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                    <tr className="t-row--si">
                        { outStrokeIndices.map((s, index) => <td className={ s === 0 ? 'invalid' : '' } key={ index }>{ s }</td>) }
                        { outHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                    <tr className="t-row--length">
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
                    <tr className="t-row--player-score">
                        { inGameStrokes.map((s, index) => <td className="hole-table__cell--score" key={ index }>{ s }</td>) }
                        { inHolesEmpty.map((nr, index) => <td className="hole-table__cell--empty" key={ index }><span></span></td>) }
                    </tr>
                    <tr className="t-row--marker-score">
                        { inGameMarkerStrokes.map((s, index) => <td className="hole-table__cell--score" key={ index }>{ s }</td>) }
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
        </>
    );
};

export default HoleTable;
