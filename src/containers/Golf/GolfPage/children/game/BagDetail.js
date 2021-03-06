import React from 'react';

import Button from '@material-ui/core/Button';

import golf from '@golfconstants/golf-namespace';

import formStyles from '@golfstyles/form.style';
import {
    FlexContainer,
    FlexItem,
    FlexItemRight
} from '@golfstyles/layout.style';

const BagDetail = ({
    bag,
    onEdit,
    onCancel
}) => {

    const classes = formStyles();

    const editHandler = () => {
        onEdit && onEdit();
    };

    const onCancelHandler = () => {
        onCancel();
    }

    const canSave = false;
    const actionLabel = 'Edit bag';

    return (
        <div className="c-box">
            <header className="c-header nudge">Bag</header>
            <div className="c-box">
            <ol className="plain-list bag-summary-list">
            {
                bag && bag.clubs.value.map(club => {

                    const iri = club.clubType.value.iri;
                    const span = iri === golf.classes.Driver || iri === golf.classes.Putter;

                    return <li key={ club.iri } className={ `bag-summary-list__club${ span ? ' bag-summary-list__club--span' : '' }` }>
                        <button className="club__btn">
                            <div className="club__name">{ club.clubBrand.value } { club.clubName.value }</div>
                            <div className="club__type">{ club.clubType.value.label }</div>
                        </button>
                    </li>
                })
            }
            </ol>
            </div>
            <FlexContainer>
                <FlexItem>
                {
                    onEdit && <Button
                        variant="contained"
                        onClick={ editHandler }
                        className={ classes.button }
                        color="primary">{ actionLabel }</Button>
                }
                </FlexItem>
                <FlexItemRight>
                { onCancel && <Button
                    variant="contained"
                    disabled={ !canSave }
                    onClick={ onCancelHandler }
                    className={ classes.button }
                    color="primary">Cancel</Button>
                }
                </FlexItemRight>
            </FlexContainer>
        </div>
    );
};

export default BagDetail;
