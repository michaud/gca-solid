import React from 'react';

import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import {
    FlexContainer,
    FlexItem,
    FlexItemRight
} from '@styles/layout.style';

const BagDetail = ({ bag }) => {

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
            {
                bag && bag.clubs.value.reduce((acc, club, idx) => {

                    const text = `${ acc }, ${ club.clubName.value } ${ club.clubType.value.label }`;
                    return text
                }, '')
            }
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
