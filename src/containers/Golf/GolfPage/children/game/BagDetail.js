import React from 'react';

import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import {
    FlexContainer,
    FlexItem,
    FlexItemRight
} from '@styles/layout.style';
import golf from '@utils/golf-namespace';

const BagDetail = ({ bag, clubTypes }) => {

    const classes = formStyles();

    const onCancel = () => {

    };

    const saveHandler = () => {

    };

    const canSave = false;
    const actionLabel = 'Edit bag';

    return (
        <div className="c-box">
            <header className="c-header--sec">Bag</header>
            <div className="c-box">
            <ol className="plain-list bag-summary-list">
            {
                bag && bag.clubs.value.map((club, idx) => {

                    const iri = club.clubType.value.iri;
                    const span = iri === golf.classes.Driver || iri === golf.classes.Putter;

                    return <li key={ idx } className={ `bag-summary-list__club${ span ? ' bag-summary-list__club--span' : '' }` }>
                        <button className="bag-summary-list__club__btn">
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
                    <Button
                        variant="contained"
                        disabled={ !canSave }
                        onClick={ saveHandler }
                        className={ classes.button }
                        color="primary">{ actionLabel }</Button>
                </FlexItem>
                <FlexItemRight>
                { onCancel && <Button
                    variant="contained"
                    disabled={ !canSave }
                    onClick={ onCancel }
                    className={ classes.button }
                    color="primary">Cancel</Button>
                }
                </FlexItemRight>
            </FlexContainer>
        </div>
    );
};

export default BagDetail;
