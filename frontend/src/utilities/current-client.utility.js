import { BehaviorSubject } from 'rxjs';

export const CurrentClient = () => {
  const currentClientToken = new BehaviorSubject(
    localStorage.getItem('currentClient'),
  );
  if (!currentClientToken) return null;

  const clientInfo = JSON.parse(currentClientToken.value);

  return clientInfo;
};
