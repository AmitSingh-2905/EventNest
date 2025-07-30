type TextareaProps = {
    placeholder?: string,
    value?: string
    overiddenStyles?: string
    reference?: React.Ref<HTMLTextAreaElement>
    id?: string 
}

const defaultStyles = "text-white outline-none rounded-md px-[10px] py-[6px] bg-blue-500 tracking-wide"

const Textarea = ({ reference, placeholder, value, overiddenStyles, id }: TextareaProps) => {
    return <textarea id={id} ref={reference} rows={10} cols={25} placeholder={placeholder} value={value} className={`${defaultStyles} resize-none ${overiddenStyles}`}></textarea>
}

export default Textarea