import React, {
    useEffect,
    useState
} from 'react';

import { StylesProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useClubData } from '@golfcontexts/dataProvider/AppDataProvider';
import removeClubsFromBag from '@golfservices/removeClubsFromBag';
import addToBag from '@golfservices/addToBag';
import deleteClub from '@golfservices/deleteClub';
import saveResource from '@golfservices/saveResource';

import golf from '@golfconstants/golf-namespace';
import {
    PageContainer,
    PageContent
} from '@golfstyles/page.style';

import ClubList from '@golfpagectrl/club/ClubList';
import ModuleHeader from '@golf/components/ModuleHeader';
import BagTransferList from '@golfpagectrl/bag/BagTransferList';
import ClubForm from '@golfpagectrl/club/ClubForm';

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

    const addClubHandler = club => {

        if (!clubListData) return;

        saveResource({
            resource: club,
            doc: clubListData.doc,
            type: golf.classes.Club
        }).then(() => reloadClubs());
    };

    const saveClubHandler = club => {
        
        saveResource({
            resource: club,
            doc: clubListData.doc,
            type: golf.classes.Club
        }).then(() => reloadClubs());
    };

    const deleteClubHandler = club => {

        const isClubInBag = bagData.bag.clubs.value.find(testClub => testClub.iri === club.iri);

        if(isClubInBag) removeClubsFromBag([club], bagData.doc);

        deleteClub(club, clubListData.doc);
        reloadClubs();
        reloadBag();
    };

    const addToBagHandler = (clubs) => {

        addToBag(clubs, bagData.doc);
        reloadClubs();
        reloadBag();
    };
    
    const removeClubsFromBagHandler = (clubs) => {

        removeClubsFromBag(clubs, bagData.doc);
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
                label={ `What's in the bag` }
                screenheader={ true }
                loading={ clubListDataIsLoading === true || bagDataIsLoading === true }/> : null }
             <PageContainerOrNot plain={ onSave !== undefined }>
                <BagTransferList
                    clubs={ clubs }
                    bag={ bagClubsState }
                    clubDefinitions={ clubDefinitions }
                    onRemoveClubsFromBag={ removeClubsFromBagHandler }
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
