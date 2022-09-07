import React, { Component, Suspense } from "react";
import { Route, Router, Redirect } from "react-router-dom";
import CodeSplitter from "service/helpers/CodeSplitter";
import { NotificationContainer } from "react-notifications";
import Routers from "./routes";
import * as Layout from "layout";
import { history } from "service/helpers";

export class RoutesClass extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router history={history}>
        <Suspense fallback={"Loading"}>
          {Routers.map(
            ({
              component,
              name,
              componentPath = "",
              redirect,
              path,
              exact = false,
              auth = true,
              childrens = [],
            }) => {
              if (childrens.length > 0) {
                return (
                  <Route
                    path={path}
                    exact={exact}
                    key={path}
                    render={(props) => {
                      if (redirect) {
                        if (props.location.pathname == path) {
                          props.history.push(redirect);
                        }
                      }

                      const LayoutComponent = Layout[component];

                      return (
                        <LayoutComponent {...props}>
                          <Suspense fallback={"Loading"}>
                            {childrens.map(
                              ({
                                componentPath: childComponentPath,
                                name = "",
                                path: childrenPath,
                                exact = false,
                                auth = true,
                              }) => {
                                CodeSplitter.addComponent(
                                  childComponentPath,
                                  name
                                );

                                return (
                                  <Route
                                    path={path + childrenPath}
                                    exact={exact}
                                    key={path + childrenPath}
                                    render={(props) => {
                                      let PageComponent =
                                        CodeSplitter.getComponent(name);

                                      return <PageComponent {...props} />;
                                    }}
                                  />
                                );
                              }
                            )}
                          </Suspense>
                        </LayoutComponent>
                      );
                    }}
                  />
                );
              }

              CodeSplitter.addComponent(componentPath, name);

              return (
                <Route
                  path={path}
                  exact={exact}
                  key={component || 2322}
                  render={(props) => {
                    if (component) {
                      let PageComponent = CodeSplitter.getComponent(name);
                      return <PageComponent />;
                    }

                    if (redirect) {
                      if (props.location.pathname == path) {
                        return <Redirect to={redirect} />;
                      }
                    }

                    return <div></div>;
                  }}
                />
              );
            }
          )}

          <NotificationContainer />
        </Suspense>
      </Router>
    );
  }
}

export const Routes = RoutesClass;
