type AlertProps = {
    msg: string 
}

const defaultStyles = "bg-blue-500 p-10 rounded-lg max-w-100 text-center"

const Alert = ({ msg }: AlertProps) => {
    return <div className={`${defaultStyles}`}>
        {msg}
    </div>
}
export default Alert