const routers = [
  {
    path: "/",
    redirect: "/home/login",
    auth: false,
  },
  {
    component: "MainLayout",
    path: "/home",
    auth: false,
    name: "MainLayout",
    exact: false,
    childrens: [
      {
        component: "LoginPage",
        path: "/login",
        componentPath: "pages/Authenticator/LoginPage.js",
        name: "LoginPage",
        auth: false,
        exact: true,
      },
      {
        component: "RegisterPage",
        path: "/register",
        componentPath: "pages/Authenticator/RegisterPage.js",
        name: "RegisterPage",
        auth: false,
        exact: true,
      },
    ],
  },

  {
    component: "PanelLayout",
    path: "/dashboard",
    auth: false,
    name: "PanelLayout",
    exact: false,
    childrens: [
      {
        component: "AddPage",
        path: "/add",
        componentPath: "pages/Panel/AddPage.js",
        name: "AddPage",
        auth: false,
        exact: true,
      },
      {
        component: "ViewPage",
        path: "/view",
        componentPath: "pages/Panel/ViewPage.js",
        name: "ViewPage",
        auth: false,
        exact: true,
      },
      {
        component: "EditPage",
        path: "/edit/:id",
        componentPath: "pages/Panel/EditPage.js",
        name: "EditPage",
        auth: false,
        exact: true,
      },
      {
        component: "PersonalViewPage",
        path: "/view/:id",
        componentPath: "pages/Panel/PersonalViewPage.js",
        name: "PersonalViewPage",
        auth: false,
        exact: true,
      },
      {
        component: "PersonalAddPage",
        path: "/user-add",
        componentPath: "pages/GeneralProfile/PersonalAddPage.js",
        name: "PersonalAddPage",
        auth: false,
        exact: true,
      },
      {
        component: "PersonalProfileViewPage",
        path: "/user-view",
        componentPath: "pages/GeneralProfile/PersonalProfileViewPage.js",
        name: "PersonalProfileViewPage",
        auth: false,
        exact: true,
      },
    ],
  },
];

export default routers;
