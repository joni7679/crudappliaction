import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Edit from "../Components/Edit.jsx/Edit";

export let router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />
        },
        {
            path: "/edit",
            element: <Edit />
        },

    ]
)