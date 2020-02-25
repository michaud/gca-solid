import React, {
    useEffect,
    useState
} from 'react';

import { StylesProvider } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

import { useClubData } from '@golfcontexts/dataProvider/AppDataProvider';
import removeFromBag from '@golfservices/removeFromBag';
import addToBag from '@golfservices/addToBag';
import deleteClub from '@golfservices/deleteClub';
import saveResource from '@golfservices/saveResource';

import golf from '@golfutils/golf-namespace';
import {
    PageContainer,
    PageContent
} from '@golfstyles/page.style';

import ClubList from '@golf/GolfPage/children/club/ClubList';
import ModuleHeader from '@golf/components/ModuleHeader';
import BagTransferList from '@golf/GolfPage/children/bag/BagTransferList';
import ClubForm from '@golf/GolfPage/children/club/ClubForm';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@golfstyles/layout.style';
import formStyles from '@golfstyles/form.style';

const ManageBag = ({ onSave, onCancel }) => {

    const [clubs, setClubs] = useState();
    const [bagClubsState, setBagClubsState] = useState();

    const {
        clubDefinitions,
        clubListData,
        clubListDataIsLoading,
        reloadClubs,
        bagData,
        reloadBag,
        bagDataIsLoading
    } = useClubData();

    const classes = formStyles();
    
    const { t } = useTranslation();
    
    useEffect(() => {
        
        let didCancel = false;

        const init = () => {

            if(!didCancel && clubListData.doc && bagData.doc) {

                setClubs(clubListData.list);

                setBagClubsState(bagData.bag.clubs.value);
            }
        }

        init();

        return () => { didCancel = true; }

    }, [
        clubListData.list,
        bagData.bag,
        clubs,
        bagClubsState
    ]);

    const addClubHandler = async (club) => {

        if (!clubListData) return;

        saveResource({
            resource: club,
            doc: clubListData.doc,
            type: golf.classes.Club
        });

        reloadClubs();
    };

    const saveClubHandler = async (club) => {
        
        saveResource({
            resource: club,
            doc: clubListData.doc,
            type: golf.classes.Club
        });

        reloadClubs();
    };

    const deleteClubHandler = club => {

        const isClubInBag = bagData.list.clubs.value.find(testClub => testClub.iri === club.iri);

        if(isClubInBag) removeFromBag([club], bagData.doc);

        deleteClub(club, clubListData.doc);
        reloadClubs();
        reloadBag();
    };

    const addToBagHandler = (clubs) => {
        //TODO which bag central bag or gameBag
        addToBag(clubs, bagData.doc);
        reloadClubs();
        reloadBag();
    };
    
    const removeFromBagHandler = (clubs) => {
        //TODO which bag central bag or gameBag
        removeFromBag(clubs, bagData.doc);
        reloadClubs();
        reloadBag();
    };

    const PageContainerOrNot = ({ plain, children }) => {
        
        return plain ? children :
        <PageContainer>
            <PageContent>
            { children }
            </PageContent>
        </PageContainer>;
    };

    return (
        <StylesProvider>
            { !onSave  ? <ModuleHeader
                label={ t('golf.whatsInTheBag') }
                screenheader={ true }
                loading={ clubListDataIsLoading === true || bagDataIsLoading === true }/> : null }
             <PageContainerOrNot plain={ onSave !== undefined }>
                <BagTransferList
                    clubs={ clubs }
                    bag={ bagClubsState }
                    clubDefinitions={ clubDefinitions }
                    onRemoveFromBag={ removeFromBagHandler }
                    onAddToBag={ addToBagHandler }/>
                <div className="c-box">
                    <ClubForm
                        onSave={ addClubHandler }
                        clubDefinitions={ clubDefinitions }/>
                </div>
                { clubs && <ClubList
                    onSave={ saveClubHandler }
                    onDelete={ deleteClubHandler }
                    clubs={ clubs } />}
                <FlexContainer>
                    <FlexItem>
                    { onSave !== undefined ? (
                        <Button
                            variant="contained"
                            onClick={ onSave }
                            className={ classes.button }
                            color="primary">Save bag</Button>
                    ) : null }
                    </FlexItem>
                    <FlexItemRight>
                    { onCancel !== undefined ? (
                        <Button
                            variant="contained"
                            onClick={ onCancel }
                            className={ classes.button }
                            color="primary">
                                Cancel
                        </Button>
                    ) : null }
                    </FlexItemRight>
                </FlexContainer>
            </PageContainerOrNot>
        </StylesProvider>
    );
};

export default ManageBag;
