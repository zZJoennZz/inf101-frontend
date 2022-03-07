const DropdownSelect = ({inputLabel, name, id, options, selectedValue, defaultOption, ...rest}) => {

    return (
        <div>
            <label htmlFor={name}>{inputLabel}</label>
            <select {...rest} name={name} id={id}> 
                <option value={0}>{defaultOption}</option>
                {
                    options.map(d => 
                        selectedValue === d.id ? <option key={d.id} value={d.id} selected>{d.label}</option>:<option key={d.id} value={d.id}>{d.label}</option>   
                    )
                }
            </select>
        </div>
    )
}

export default DropdownSelect;