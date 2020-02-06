import React, { useEffect, useState, useContext } from 'react';

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

import ClubTypeContext from '@utils/clubTypeContext';

const ManageBag = () => {

    const [reload, setReload] = useState(false);
    const [clubs, setClubs] = useState();
    const [bagClubs, setBagClubs] = useState();
    const clubTypeData = useContext(ClubTypeContext);
    const clubListData = useClubs(clubTypeData.clubTypes, clubTypeData.clubType, reload);
    const bagData = useBagClubs(clubTypeData.clubTypes, clubTypeData.clubType, reload);
    const { t } = useTranslation();

    useEffect(() => {

        if((clubListData.list !== clubs && bagClubs !== bagData) || reload) {

            const clubs = clubListData.list;
    
            setClubs(state => clubs);
            setBagClubs(state => bagData);
            setReload(state => false);
        }

    }, [clubListData.list, bagData.list, reload]);

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

        const isClubInBag = bagData.list.find(testClub => testClub.iri === club.iri);

        if(isClubInBag) removeFromBag([club], bagData.doc);

        deleteClub(club, clubListData.doc);
        setReload(true);
    };

    const addToBagHandler = (clubs) => {
        
        addToBag(clubs, bagData.doc);
        setReload(true)
    };
    
    const removeFromBagHandler = (clubs) => {
        
        removeFromBag(clubs, bagData.doc);
        setReload(true)
    };

    const loading = reload || clubListData.doc === undefined || bagData.doc === undefined;

    return (
        <StylesProvider>
            <ModuleHeader label={ t('golf.whatsInTheBag') } screenheader={ true } loading={ loading }/>
            <PageContainer>
                <BagTransferList
                    clubs={ clubs }
                    bag={ bagClubs }
                    onRemoveFromBag={ removeFromBagHandler }
                    onAddToBag={ addToBagHandler }/>
                <ClubForm onSave={ addClubHandler } />
                {clubs && <ClubList
                    onSave={ saveClubHandler }
                    onDelete={ deleteClubHandler }
                    clubs={ clubs } />}
            </PageContainer>
        </StylesProvider>
    );
};

export default ManageBag;
