
import React from 'react';
import { Route, RouteProps } from 'react-router';

export function validateEmail(email: string): boolean {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

interface AppRouteProps extends RouteProps {
    component: any
    props?: any;
}

export const AppRoute = (props: AppRouteProps) => (
    <Route
      {...props}
      render={(renderProps) => {
        return (
            <props.component {...renderProps}{...props.props} />
        )
      }
      } />
  );

export const validEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email) ? undefined : "invalid email";
}