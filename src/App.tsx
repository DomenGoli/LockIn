import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./ui/AppLayout";
import AddActivity from "./features/days/day_input/CreateUpdateActForm";
import { loader as daysLoader } from "./features/days/day_history/DaysList";
import { getDaysApi } from "./service/apiDays";
import Error from "./ui/Error";

const router = createBrowserRouter([
    {
        Component: AppLayout,
        path: "/",
        loader: daysLoader,
        action: getDaysApi,
        errorElement: <Error />,
        children: [
            {
                Component: AddActivity,
                path: "/add-activity",
                errorElement: <Error />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
