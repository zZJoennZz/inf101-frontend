const DropdownSelect = ({inputLabel, name, id, options, selectedValue, defaultOption, ...rest}) => {

    return (
        <div>
            <label htmlFor={name}>{inputLabel}</label>
            <select {...rest} name={name} id={id}> 
                <option value={0}>{defaultOption}</option>
                {
                    options.map(d => 
                        selectedValue === d.value ? <option key={d.value} value={d.value} selected>{d.label}</option>:<option key={d.value} value={d.value}>{d.label}</option>   
                    )
                }
            </select>
        </div>
    )
}

export default DropdownSelect;