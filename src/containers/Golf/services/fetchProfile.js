import solidAuth from 'solid-auth-client';
import { fetchDocument } from 'tripledoc';

const fetchProfile = async () => {
  const currentSession = await solidAuth.currentSession();
  if (!currentSession) {
    return null;
  }

  const webIdDoc = await fetchDocument(currentSession.webId);
  const profile = webIdDoc.getSubject(currentSession.webId);
  return profile;
}

export default fetchProfile;
