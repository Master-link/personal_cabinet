import { Route, Switch } from 'react-router-dom';
import ProfilePage from '../pages/profile.page';

export const CommonRoutes = () => (
  <Switch>
    <Route
      exact
      path="/profile"
      render={(props) => (
        <ProfilePage {...props} action="show" />
      )}
    />
  </Switch>
);
