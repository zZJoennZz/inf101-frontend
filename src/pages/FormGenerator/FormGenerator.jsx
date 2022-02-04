import React, { useState } from 'react';

const FormGenerator = () => {
    let [frmConfig, setFrmConfig] = useState({});
    let frmCon = [];
    let [fName, setFName] = useState('');
    let [fLabel, setFLabel] = useState('');
    let [fType, setFType] = useState('');
    const genForm = (e) => { 
        e.preventDefault();
        setFrmConfig([{...frmConfig}, {'field_name' : fName, 'field_label' : fLabel, 'field_type' : fType}]);
        frmCon.push({'field_name' : fName, 'field_label' : fLabel, 'field_type' : fType});
        console.log(frmCon);
    }

    const handleFName = (e) => setFName(e.target.value);
    const handleFLabel = (e) => setFLabel(e.target.value);
    const handleFType = (e) => setFType(e.target.value);

    return (
        <div>
            <form id="field-form" onSubmit={genForm}>
                <div>
                    <label htmlFor="field-name">Field Name: </label>
                    <input onChange={handleFName} type="text" className="field-name" name="field-name" />
                </div>

                <div>
                    <label htmlFor="field_label">Field Label: </label>
                    <input onChange={handleFLabel} type="text" className="field-label" name="field-label" />
                </div>

                <div>
                    <label htmlFor="field_type">Field Type: </label>
                    <input onChange={handleFType} type="text" className="field-type" name="field-type" />
                </div>
                <br />
                <div>
                    <button type="submit" name="button">Add to config</button>
                </div>
            </form>
            <textarea name="fConfig" readOnly value={JSON.stringify(frmConfig)} className="fConfig" rows="8" cols="80"></textarea>
        </div>
    )
}

export default FormGenerator;