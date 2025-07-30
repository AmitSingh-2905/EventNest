type InputProps = {
    type: "text" | "password" | "url" | "date"
    placeholder?: string,
    value?: string
    overiddenStyles?: string
    reference?: React.Ref<HTMLInputElement>
    id?: string 
}

const defaultStyles = "text-white outline-none rounded-md px-[10px] py-[6px] bg-blue-500 tracking-wide"

const Input = ({ type, placeholder, value, overiddenStyles, reference, id }: InputProps) => {
    return <>
            <input id={id} ref={reference} type={type} placeholder={placeholder} value={value} className={`${defaultStyles} ${overiddenStyles}`} />
        </>
}
export default Input