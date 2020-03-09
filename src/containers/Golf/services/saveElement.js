import saveReferenceData from "@golfservices/saveReferenceData";

const saveElement = ({
    element,
    doc,
    type
}) => {

    return saveReferenceData({
        data: element,
        doc,
        type
    });
}

export default saveElement;
