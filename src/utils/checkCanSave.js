const checkCanSave = state => {
    
    return state && Object.entries(state.fields).every(entry => {
        
        return entry[1].field.value !== '';
    });
};

export default checkCanSave;

