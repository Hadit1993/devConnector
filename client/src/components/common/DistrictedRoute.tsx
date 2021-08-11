import { ComponentType } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";

export default function DistrictedRoute(
  props: RouteProps & { condition: boolean; redirect: string; isReady: boolean }
) {
  return (
    <Route
      {...props}
      component={undefined}
      render={(routeProps) => {
        const Component = props.component as ComponentType<RouteComponentProps>;

        return props.isReady ? (
          props.condition ? (
            <Component {...routeProps} />
          ) : (
            <Redirect to={props.redirect} />
          )
        ) : (
          <></>
        );
      }}
    />
  );
}
