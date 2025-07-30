type LabelProps = {
    text: string,
    htmlFor?: string  
}

const defaultStyles = "text-white text-sm italic opacity-50"

const Label = ({ text, htmlFor }: LabelProps) => {
    return <label htmlFor={htmlFor} className={`${defaultStyles}`}>
        {text}
    </label>
} 

export default Label