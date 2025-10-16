import React, { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
// import Button from "./Button";
import { useOutsideModalClick } from "../hooks/useOutsideModalClick";

type ContextType = {
    handleOpen: ()=>void;
    handleClose: ()=>void;
    isOpen: boolean
}

const defaultValue = {
    handleOpen: ()=> {},
    handleClose: ()=> {},
    isOpen: false

}

//1. context
const ModalContext = createContext<ContextType>(defaultValue)


//2. parent
export default function Modal({children}: {children:React.ReactNode}) {
    const [isOpen, setIsOpen] = useState(false)

    function handleOpen(){
        setIsOpen(true)
    }

    function handleClose() {
        setIsOpen(false)
    }

    return <ModalContext.Provider value={{isOpen, handleClose, handleOpen }}>{children}</ModalContext.Provider>
}


//3. children
function Open({children}: {children: React.ReactNode}) {
    const {handleOpen} = useContext(ModalContext)
    // if(React.isValidElement(children)) 
    return cloneElement(children   as React.ReactElement<{onClick: () => void}>, {onClick: handleOpen} )
}

function Window({children}: {children:React.ReactNode}) {
    const {isOpen, handleClose} = useContext(ModalContext)

    const {ref} = useOutsideModalClick(handleClose)

    if(!isOpen) return null;

    return createPortal(
        <div role="overlay" className="fixed items-center justify-center top-0 left-0 w-[100%] h-[100vh] bg-[var(--color-backdrop-color)] backdrop-blur-[30px] z-1000 transition-all duration-[0.5s]">
            <div ref={ref} role="modal-window" className="fixed top-6/12 left-6/12 -translate-x-1/2 -translate-y-1/2 bg-[var(--day)] rounded-[var(--border-radius-lg)] p-[3.2rem_4rem] transition-all duration-[0.5s]">
                <button role="close" className="bg-none border-none p-[0.4rem] absolute transform-[translateX-[3.8rem]] top-[1.2rem] right-[1.9rem] cursor-pointer" onClick={handleClose}>X</button>
                <div>{cloneElement(children  as React.ReactElement<{onCloseModal: () => void}>, {onCloseModal: handleClose})}</div>
            </div>
        </div>, document.body
    )
}


//4. properties
Modal.Open = Open;
Modal.Window = Window;

// .datum_input {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 20rem;
//   height: 25rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;