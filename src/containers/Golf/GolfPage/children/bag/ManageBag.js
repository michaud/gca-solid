import React, { useEffect, useState } from 'react';

import { StylesProvider } from '@material-ui/core/styles';
import { errorToaster } from '@utils';
import { useNotification } from '@inrupt/solid-react-components';
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
import { withClubTypeContext } from '@utils/clubTypeContext';

const ManageBag = ({ match, webId, history, clubTypes, clubType }) => {

    const { notification } = useNotification(webId);
    const [reload, setReload] = useState(false);

    const bagData = useBagClubs(clubTypes, clubType, reload);
    const clubListData = useClubs(clubTypes, clubType, reload);
    const [clubs, setClubs] = useState();
    const [bagClubs, setBagClubs] = useState();
    const { t } = useTranslation();

    const addClubHandler = async (club) => {

        if (!clubListData) return;

        await saveResource(club, clubListData.doc, golf.classes.Club);
        setReload(true);
    };

    const saveClubHandler = async (club) => {
        
        await saveResource(club, clubListData.doc, golf.classes.Club);
        setReload(true);
    };

    const deleteClubHandler = club => {

        removeFromBag([club], bagData.doc);
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

    const init = async () => {

        try {

            if (clubListData) {

                const clubs = clubListData.list;
                setClubs(clubs);
                setReload(false);
            }

            if(bagData) {

                setBagClubs(bagData);
            }
        } catch (e) {
            /**
             * Check if something fails when we try to create a inbox
             * and show user a possible solution
             */
            if (e.name === 'Inbox Error') {
                return errorToaster(e.message, 'Error', {
                    label: t('errorCreateInbox.link.label'),
                    href: t('errorCreateInbox.link.href')
                });
            }

            errorToaster(e.message, 'Error');
        }
    };

    useEffect(() => {

        if (webId && notification.notify) {
            init();
        }

    }, [webId, clubListData, bagData, reload, notification.notify]);

    return (
        <StylesProvider>
            <ModuleHeader label={ t('golf.whatsInTheBag') } screenheader={ true }/>
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

export default withClubTypeContext(ManageBag);
