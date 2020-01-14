import { createContext } from 'react';

export const EditContext = /*#__PURE__*/ createContext(null);

if (process.env.NODE_ENV !== 'production') EditContext.displayName = 'EditContext';

export default EditContext;
