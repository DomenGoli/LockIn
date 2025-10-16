import React from "react";

type StylesType = {
    [key:string]: string
}

const styles: StylesType  = {
    primary: "bg-blue-600 inline-block uppercase px-2 hover:bg-blue-500 cursor-pointer transition-all tracking-wide rounded-md active:bg-blue-300 break-normal flex items-center h-5 min-w-[2.2rem]",
    tileTitle: "cursor-pointer transition-all tracking-wide rounded-md active:text-amber-600",
}


export default function Button({
    children,
    onClick,
    disabled,
    variation = "primary"
}: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variation?: string
}): React.JSX.Element {




    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={styles[variation]}
            // className="bg-blue-600"
        >
            {children}
        </button>
    );
}


// const base = "border-none rounded-[var(--border-radius-sm)] shadow-[var(--shadow-sm)]"
// const styles = {
//   primary: "text-[var(--color-brand-50)] bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)]",
//   secondary: "text-[var(--color-grey-600)] bg-[var(--color-grey-0)] border-[1px] border-solid border-[var(--color-grey-200)] hover:bg-[var(--color-grey-50)]",
//   danger: "text-[var(--color-red-100)] bg-[var(--color-red-700)] hover:bg-[var(--color-red-800)]",

//   small: "text-[1.2rem] p-[0.4rem_0.8rem] uppercase font-[600] text-center",
//   medium: "text-[1.4rem] p-[1.2rem_1.6rem] font-[500]",
//   large: "text-[1.6rem] p-[1.2rem_2.4rem] font-[500]"

// }

// export default function Button({children, onClick, variation="primary", size="medium", type}) {
//   return(
//     <button type={type} className={base + " " + styles[variation] + " " + styles[size]} onClick={onClick}>{children}</button>
//     // <div className="border-[1px] border-solid border-[var(--color-grey-200)]"></div>
//   )
// }