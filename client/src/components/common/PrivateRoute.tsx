import { ComponentType } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";

export default function PrivateRoute(
  props: RouteProps & { condition: boolean; redirect: string }
) {
  // return (
  //   <Route
  //     {...props}
  //     render={(routeProps) => {
  //       console.log({ routeProps });
  //       const Component = props.component as ComponentType<RouteComponentProps>;

  //       return props.condition ? (
  //         <Component {...routeProps} />
  //       ) : (
  //         <Redirect to={props.redirect} />
  //       );
  //     }}
  //   />
  // );
  return props.condition ? (
    <Route {...props} />
  ) : (
    <Redirect to={props.redirect} />
  );
}
