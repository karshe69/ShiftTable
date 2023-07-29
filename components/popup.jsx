const PopupContext = React.createContext("Default Value")


export function Popup({ children }) {
    return (
        <PopupContext>
            <div className='className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"'>
                {children}
            </div>
        </PopupContext>
    )
}
