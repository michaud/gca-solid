import saveReferenceData from "@golfservices/saveReferenceData";

const saveResource = ({
    resource,
    doc,
    type
}) => {

    saveReferenceData({
        data: resource,
        doc,
        type
    });
    
    return doc.save();
};

export default saveResource;
