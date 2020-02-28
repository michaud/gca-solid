- fix adding discontinuous holes
  - sort holes every time
  - get available SI needs to be updated when deleting and adding holes 
- fix cancel button display in Create marker
- implement delete hole in edit course
- implement delete game
- parse club data club type is not done
- parsing bag data misses fields like iri & label
- clubtype should be filled with data from club? or remove fields? 
- check iri s in data
- use fieldLabel for labels

X implement Owner on Club
X handle card#me references
X saveMarker as savePlayer
X saveCourse, saveClub as saveClubToList
X flesh out the complete shape of the geocoordinate fields in setupobject i think
X add missing labels to data
X update fields on contexts/shape with  label value
X implement playing handicap (game detail)
X Fix space beneath app buttons
X Fix Create player loading in later than Marker component
X implement delete club
X Fix width of in holes table when adding holes
X Fix save course button space with table
X handle available SI when editing holes in edit course 
    X validate hole SI has > 0 value
X rewrite game data so separate game files are used
X Should we make the game bag and clubs unique?
    X the clubs in the (not game) bag can change at any time 
X fix setstate on unmounted components
X Fix club list display
X Bag detail
X implement Change Player Handicap in player update
X implement Bag detail edit
X sorting of clubs for display in game hole
X implement Add marker in Select Marker or GameForm
X implement Edit course
X add game start time filled should be put in gamestate?  
X game detail view
X fix add hole in course form with async 
X implement Delete course
