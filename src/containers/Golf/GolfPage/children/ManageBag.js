import React, { useEffect, useState } from 'react';

import { StylesProvider } from '@material-ui/core/styles';
import { errorToaster } from '@utils';
import { useNotification } from '@inrupt/solid-react-components';
import useClubData from '@hooks/useClubData';
import useClubDefinitions from '@hooks/useClubDefinitions';
import useBagClubData from '@hooks/useBagClubData';
import { useTranslation } from 'react-i18next';

import addClub from '@services/addClub';
import removeFromBag from '@services/removeFromBag';
import addToBag from '@services/addToBag';
import saveClub from '@services/saveClub';
import deleteClub from '@services/deleteClub';

import ClubTypeContext from '@utils/clubTypeContext';
import ClubForm from './ClubForm';
import ClubList from './ClubList';
import ModuleHeader from './ModuleHeader';
import BagTransferList from './BagTransferList';
import { PageContainer } from '@styles/page.style';

const ManageBag = ({ match, webId, history }) => {

    const { notification } = useNotification(webId);
    const [reload, setReload] = useState(false);
    const clubTypeDefinitions = useClubDefinitions();
    const bagData = useBagClubData(clubTypeDefinitions, reload);
    const clubData = useClubData(clubTypeDefinitions, reload);
    const [clubs, setClubs] = useState();
    const [bagClubs, setBagClubs] = useState();
    const { t } = useTranslation();

    const addClubHandler = async (club) => {

        if (!clubData) return;

        await addClub(club, clubData.doc);

        setReload(true);
    };

    const saveClubHandler = club => {
        
        saveClub(club, clubData.doc);
        setReload(true);
    };

    const deleteClubHandler = club => {

        removeFromBag([club], bagData.doc);
        deleteClub(club, clubData.doc);
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

            if (clubData) {

                const clubs = clubData.list;
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

    }, [webId, clubData, bagData, reload, notification.notify]);

    return (
        <StylesProvider>
            <ClubTypeContext.Provider value={ clubTypeDefinitions }>
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
            </ClubTypeContext.Provider>
        </StylesProvider>
    );
};

export default ManageBag;
