import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getAuth } from 'Redux/Auth/thunks';

import PrivateRoute from './privateRoute';
import { tokenListener } from 'Components/helper/firebase';
import Loader from 'Components/Shared/Loader';

const HomeRoute = lazy(() => import('./home'));
const AuthRoutes = lazy(() => import('./auth'));
const AdminRoutes = lazy(() => import('./admins'));
const SuperAdminRoutes = lazy(() => import('./superAdmins'));
const MemberRoutes = lazy(() => import('./members'));
const TrainerRoutes = lazy(() => import('./trainers'));

const Routes = () => {
  const dispatch = useDispatch();

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    tokenListener();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getAuth(token));
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Loader />
          </div>
        }
      >
        <Switch>
          <Route exact path="/" component={HomeRoute} />
          <Route path="/auth" component={AuthRoutes} />
          <PrivateRoute path="/user/super-admin" role="SUPER_ADMIN" component={SuperAdminRoutes} />
          <PrivateRoute path="/user/admin" role="ADMIN" component={AdminRoutes} />
          <PrivateRoute path="/user/trainer" role="TRAINER" component={TrainerRoutes} />
          <PrivateRoute path="/user/member" role="MEMBER" component={MemberRoutes} />
          <Redirect to={'/'} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
