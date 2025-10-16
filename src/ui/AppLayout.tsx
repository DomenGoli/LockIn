import { Toaster } from "react-hot-toast";
import DaysList from "../features/days/day_history/DaysList";
import InputDay from "../features/days/day_input/InputDay";
import Sidebar from "./Sidebar";

function AppLayout() {
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-[auto_22rem]">
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "var(--color-grey-0)",
                            color: "var(--color-grey-700)",
                        },
                    }}
                />
                <div className="">
                    <div className="grid h-screen grid-rows-[1fr_auto] p-5 gap-7">
                        <DaysList />
                        <InputDay />
                    </div>
                </div>

                <div className="bg-[var(--day)] mt-5 mr-5 mb-5">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}

export default AppLayout;

// prejsna barva: bg-[var(--day)]
