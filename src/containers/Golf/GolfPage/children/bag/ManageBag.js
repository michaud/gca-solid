import React, {
    useEffect,
    useState,
    useContext
} from 'react';

import { StylesProvider } from '@material-ui/core/styles';
import useClubs from '@hooks/useClubs';
import useBagClubs from '@hooks/useBagClubs';
import { useTranslation } from 'react-i18next';

import removeFromBag from '@services/removeFromBag';
import addToBag from '@services/addToBag';
import deleteClub from '@services/deleteClub';

import ClubForm from '@containers/Golf/GolfPage/children/club/ClubForm';
import ClubList from '@containers/Golf/GolfPage/children/club/ClubList';
import ModuleHeader from '@containers/Golf/GolfPage/children/ModuleHeader';
import BagTransferList from '@containers/Golf/GolfPage/children/bag/BagTransferList';
import { PageContainer } from '@styles/page.style';
import saveResource from '@services/saveResource';
import golf from '@utils/golf-namespace';
import { Snackbar } from '@material-ui/core';
import Alert from '@containers/Golf/components/Alert';

import ClubTypeContext from '@utils/clubTypeContext';

const ManageBag = () => {

    const [reload, setReload] = useState(false);
    const [clubs, setClubs] = useState();
    const [bagClubs, setBagClubs] = useState();
    const [snackOpen, setSnackOpen] = useState(false);
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

    return (
        <StylesProvider>
            <ModuleHeader label={ t('golf.whatsInTheBag') } screenheader={ true } loading={ clubListDataIsLoading === true || bagListDataIsLoading === true }/>
            <Snackbar
                open={ snackOpen }
                autoHideDuration={ 4000 }
                onClose={ handleSnackClose }
                anchorOrigin={{ vertical:'top', horizontal: 'center' }}>
                <Alert onClose={ handleSnackClose } severity="error">
                    Courses did not load
                </Alert>
            </Snackbar>
             <PageContainer>
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
            </PageContainer>
        </StylesProvider>
    );
};

export default ManageBag;
