import type { ReactElement } from "react"

type SidebarItemProps = {
    icon?: ReactElement
    text: string
    color: string
    onClick: () => void
}

const SidebarItem = ({ icon, text, color, onClick }: SidebarItemProps) => {
    return <div onClick={onClick} className={`flex items-center ${color} p-2 mx-4 text-lg hover:bg-black/20 transition-all duration-200 cursor-pointer`}>
        <div>
            {icon}
        </div>
        <div className="ml-2">
            {text}
        </div>
    </div>
}

export default SidebarItem