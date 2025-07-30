import type { ReactElement } from "react"

type HeaderProps = {
    children: ReactElement
}

const defaultStyles = "py-4 pr-5 mb-8 flex justify-end"

const Header = ({ children }: HeaderProps) => {
    return <div className={`${defaultStyles}`}>
        {/* buttons area */}
        {children}
    </div>
}

export default Header