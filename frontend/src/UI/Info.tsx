type InfoProps = {
    title: string,
    content: string,
    contentType: "text" | "url"
    size?: string,
    titleColor?: string
    contentColor?: string
}

const Info = ({ title, content, contentType, size, titleColor, contentColor }: InfoProps) => {
    return <div className={`${size} text-white`}>
        {/* title */}
        <span className={`${titleColor} font-bold break-all`}>
            {title}:
        </span>
        {/* content */}
        <span className={`${contentColor} ml-2 break-all`}>
            {contentType === "text" &&
                <>
                    {content}
                </>
            }
            {contentType === "url" &&
                <a href={content} target="_blank" className="hover:text-neonblue-100 hover:underline">
                    {content}
                </a>
            }
        </span>
    </div>
}

export default Info