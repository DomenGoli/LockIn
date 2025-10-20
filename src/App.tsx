import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./ui/AppLayout";
// import AddActivity from "./features/days/day_input/CreateUpdateActForm";
// import DaysList, {
//     loader as daysLoader,
// } from "./features/days/day_history/DaysList";
// import { getDaysApi } from "./service/apiDays";
import Error from "./ui/Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        Component: AppLayout,
        path: "/",
        errorElement: <Error />,
        // children: [
        //     {
        //         Component: AddActivity,
        //         path: "/add-activity",
        //         errorElement: <Error />,
        //     },
        //     {
        //         path: "/",
        //         Component: DaysList,
        //         loader: daysLoader,
        //         action: getDaysApi,
        //         errorElement: <Error />,
        //     },
        // ],
    },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
