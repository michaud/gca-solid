import { rdf, solid } from 'rdf-namespaces';

const addToTypeIndex = async(
    typeIndex,
    document,
    forClass,
) => {
    const typeRegistration = typeIndex.addSubject();
    typeRegistration.addRef(rdf.type, solid.TypeRegistration)
    typeRegistration.addRef(solid.instance, document.asRef())
    typeRegistration.addRef(solid.forClass, forClass)
    return await typeIndex.save([typeRegistration]);
};

export default addToTypeIndex;
