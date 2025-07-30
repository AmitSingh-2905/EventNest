import type { ReactElement } from "react"

type MainContentProps = {
    children: ReactElement
}

const MainContent = ({ children }: MainContentProps) => {
    return <div className="h-full ml-72 pr-4">
        {children}
    </div>
}

export default MainContent