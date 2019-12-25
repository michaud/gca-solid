import React, { useEffect, useState } from 'react';

import { StylesProvider } from '@material-ui/core/styles';
import { errorToaster } from '@utils';
import { useNotification } from '@inrupt/solid-react-components';
import useClubList from '@hooks/useClubList';
import useClubDefinitions from '@hooks/useClubDefinitions';
import useBagClubList from '@hooks/useBagClubList';
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
    const [dirty, setDirty] = useState(true);
    const clubTypeDefinitions = useClubDefinitions();
    const bagList = useBagClubList(clubTypeDefinitions, dirty);
    const clubList = useClubList(clubTypeDefinitions, dirty);
    const [clubs, setClubs] = useState();
    const [bagClubs, setBagClubs] = useState();
    const { t } = useTranslation();

    const addClubHandler = async (club) => {

        if (!clubList) return;

        await addClub(club, clubList.doc);

        setDirty(true);
    };

    const saveClubHandler = club => {
        
        saveClub(club, clubList.doc);
        setDirty(true);
    };

    const deleteClubHandler = club => {

        removeFromBag([club], bagList.doc);
        deleteClub(club, clubList.doc);
        setDirty(true);
    };

    const addToBagHandler = (clubs) => {
        
        addToBag(clubs, bagList.doc);
    };
    
    const removeFromBagHandler = (clubs) => {
        
        removeFromBag(clubs, bagList.doc);
    };

    const init = async () => {

        try {

            if (clubList) {

                const clubs = clubList.list;
                setClubs(clubs);
                setDirty(false);
            }

            if(bagList) {

                setBagClubs(bagList);
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

    }, [webId, clubList, bagList, notification.notify]);

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
