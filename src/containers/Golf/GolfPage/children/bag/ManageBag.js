import React, {
    useEffect,
    useState,
    useContext
} from 'react';

import { StylesProvider } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

import useClubs from '@golfhooks/useClubs';
import useBagClubs from '@golfhooks/useBagClubs';

import removeFromBag from '@golfservices/removeFromBag';
import addToBag from '@golfservices/addToBag';
import deleteClub from '@golfservices/deleteClub';
import saveResource from '@golfservices/saveResource';

import golf from '@golfutils/golf-namespace';
import { PageContainer } from '@golfstyles/page.style';

import ClubTypeContext from '@golfutils/clubTypeContext';
import ClubList from '@containers/Golf/GolfPage/children/club/ClubList';
import ModuleHeader from '@containers/Golf/components/ModuleHeader';
import BagTransferList from '@containers/Golf/GolfPage/children/bag/BagTransferList';
import Alert from '@containers/Golf/components/Alert';
import ClubForm from '@containers/Golf/GolfPage/children/club/ClubForm';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@golfstyles/layout.style';
import formStyles from '@golfstyles/form.style';

const ManageBag = ({ onSave, onCancel }) => {

    const [reload, setReload] = useState(false);
    const [clubs, setClubs] = useState();
    const [bagClubs, setBagClubs] = useState();
    const [snackOpen, setSnackOpen] = useState(false);

    const classes = formStyles();

    const clubTypeData = useContext(ClubTypeContext);
    const [{
        clubListData,
        isLoading: clubListDataIsLoading,
        isError: clubListDataIsError
    }] = useClubs(clubTypeData.clubTypes, clubTypeData.clubType, reload);
    const [{
        bagListData,
        isLoading: bagListDataIsLoading,
        isError: bagListDataIsError
    }] = useBagClubs(clubTypeData.clubTypes, clubTypeData.clubType, reload);
    const { t } = useTranslation();

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if(!didCancel && (!clubListDataIsLoading && !bagListDataIsLoading)) {

                setSnackOpen(clubListDataIsError || bagListDataIsError);
                setClubs(state => clubListData.list);
                setBagClubs(state => bagListData.list);
                setReload(state => false);
            }
        }

        init();

        return () => { didCancel = true; }

    }, [
        clubListData.list,
        bagListData.list,
        clubs,
        bagClubs,
        clubTypeData.clubTypes,
        clubTypeData.clubType,
        reload
    ]);

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
    };

    const addClubHandler = async (club) => {

        if (!clubListData) return;

        saveResource({
            resource: club,
            doc: clubListData.doc,
            type: golf.classes.Club
        });
        setReload(true);
    };

    const saveClubHandler = async (club) => {
        
        saveResource({
            resource: club,
            doc: clubListData.doc,
            type: golf.classes.Club
        });
        setReload(true);
    };

    const deleteClubHandler = club => {

        const isClubInBag = bagListData.list.find(testClub => testClub.iri === club.iri);

        if(isClubInBag) removeFromBag([club], bagListData.doc);

        deleteClub(club, clubListData.doc);
        setReload(true);
    };

    const addToBagHandler = (clubs) => {
        
        addToBag(clubs, bagListData.doc);
        setReload(true)
    };
    
    const removeFromBagHandler = (clubs) => {
        
        removeFromBag(clubs, bagListData.doc);
        setReload(true)
    };

    const PageContainerOrNot = ({ plain, children }) => {
        
        return plain ? children :
        <PageContainer>
            { children }
        </PageContainer>;
    };

    return (
        <StylesProvider>
            { !onSave  ? <ModuleHeader label={ t('golf.whatsInTheBag') } screenheader={ true } loading={ clubListDataIsLoading === true || bagListDataIsLoading === true }/> : null }
            <Snackbar
                open={ snackOpen }
                autoHideDuration={ 4000 }
                onClose={ handleSnackClose }
                anchorOrigin={{ vertical:'top', horizontal: 'center' }}>
                <Alert onClose={ handleSnackClose } severity="error">
                    Courses did not load
                </Alert>
            </Snackbar>
             <PageContainerOrNot plain={ onSave !== undefined }>
                <BagTransferList
                    clubs={ clubs }
                    bag={ bagClubs }
                    onRemoveFromBag={ removeFromBagHandler }
                    onAddToBag={ addToBagHandler }/>
                <ClubForm onSave={ addClubHandler } />
                { clubs && <ClubList
                    onSave={ saveClubHandler }
                    onDelete={ deleteClubHandler }
                    clubs={ clubs } />}
                <FlexContainer>
                    <FlexItem>
                        <Button
                            variant="contained"
                            onClick={ onSave }
                            className={ classes.button }
                            color="primary">Save bag</Button>
                    </FlexItem>
                    <FlexItemRight>
                    { onCancel !== undefined && <Button
                        variant="contained"
                        onClick={ onCancel }
                        className={ classes.button }
                        color="primary">Cancel</Button>
                    }
                    </FlexItemRight>
                </FlexContainer>
            </PageContainerOrNot>
        </StylesProvider>
    );
};

export default ManageBag;
