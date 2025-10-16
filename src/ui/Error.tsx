import { useRouteError } from "react-router";

type ErrorType = {
    data: string;
    message: string
}

function Error() {
    const error = useRouteError() as ErrorType;

    return (
        <div>
            <h1>Something went wrong 😢</h1>
            <p>{error.data || error.message}</p>
        </div>
    );
}

export default Error;
