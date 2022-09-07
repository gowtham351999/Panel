import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { api } from "service/api";
import { Toast } from "service/toast";
import { reducers } from "../../reducer";

export const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ api, Toast })))
);

export const history = require("history").createBrowserHistory({
	basename: "/",
});
