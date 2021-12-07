const TextInput = ({inputLabel, name, id, ...rest}) => {
    return (
        <div>
            <label htmlFor={name}>{inputLabel}</label>
            <input {...rest} name={name} id={id} />  
        </div>
    )
}

export default TextInput;