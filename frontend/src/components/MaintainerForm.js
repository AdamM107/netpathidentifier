import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MaintainerForm({ selectedRow, selectedRowType, onRowDeleted, formData, setFormData, fetchData }) {
    const [circuitType, setCircuitType] = useState(""); // This is for ANet or BNet

    useEffect(() => {
        if (selectedRow && selectedRowType) {
            setCircuitType(selectedRowType);
            setFormData(selectedRow);
        }
    }, [selectedRow, selectedRowType, setFormData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRadioChange = (e) => {
        setCircuitType(e.target.value);
        setFormData({}); // Resets the form data when types are switched
    };

    const handleSubmit = () => {
        const backendURL = process.env.REACT_APP_API_URL;
        const endpoint = circuitType === "ANet" ? '/api/anetCircuits/create' : '/api/bnetCircuits/create'
        axios.post(backendURL + endpoint, formData)
            .then(response => {
                setFormData({});
                console.log('Data added:', response.data);
                alert('Data successfully added.');
                fetchData();
                // Success handling
            })
            .catch(error => {
                console.error('Error adding data', error);
                // Error handling
            });
    };

    const handleUpdate = () => {
        const backendURL = process.env.REACT_APP_API_URL;
        const endpoint = circuitType === "ANet" ? `/api/anetCircuits/update/${selectedRow._id}` : `/api/bnetCircuits/update/${selectedRow._id}`;
        axios.put(backendURL + endpoint, formData)
            .then(response => {
                console.log('Data updated:', response.data);
                alert('Data successfully updated.');
                fetchData();
            })
            .catch(error => {
                console.error('Error updating data', error);
            })
    }

    function handleDelete() {
        const backendURL = process.env.REACT_APP_API_URL;
        if (selectedRow && selectedRow._id) {
            let endpoint;
            if (selectedRowType === 'ANet') {
                endpoint = `${backendURL}/api/anetCircuits/delete/${selectedRow._id}`;
                alert('Data successfully removed.');
                fetchData();
            } else if (selectedRowType === 'BNet') {
                endpoint = `${backendURL}/api/bnetCircuits/delete/${selectedRow._id}`;
                alert('Data successfully removed.');
                fetchData();
            } else {
                console.error('Invalid selectedRowType:', selectedRowType);
                return;
            }
            axios.delete(endpoint)
                .then(response => {
                    console.log('Data deleted:', response.data);
                    onRowDeleted(selectedRow);
                    fetchData();
                })
                .catch(error => {
                    console.error('Error deleting data', error);
                });
        }
    }


    return (
    <div>
        <div className="radio-container">
        <label>
            <input className="CircuitTypeRadio"
        type="radio"
        value="ANet"
        checked={circuitType === "ANet"}
        onChange={handleRadioChange}
        />
            ANet Circuit
        </label>
            <label>
                <input className="CircuitTypeRadio"
                    type="radio"
                    value={"BNet"}
                    checked={circuitType === "BNet"}
                    onChange={handleRadioChange}
                    />
                BNet Circuit
            </label>
        </div>

        {circuitType === "ANet" && (
            <div className ="MaintainerEntry">
                <input className ="MaintainerEntryField" name="POP" value={formData.POP || ""} onChange={handleChange} placeholder="POP" />
                <input className ="MaintainerEntryField" name="Device" value={formData.Device || ""} onChange={handleChange} placeholder="Device" />
                <input className ="MaintainerEntryField" name="CircuitID" value={formData.CircuitID || ""} onChange={handleChange} placeholder="CircuitID" />
                <input className ="MaintainerEntryField" name="Description" value={formData.Description || ""} onChange={handleChange} placeholder="Description" />
                <input className ="MaintainerEntryField" name="APort" value={formData.APort || ""} onChange={handleChange} placeholder="APort" />
                <input className ="MaintainerEntryField" name="ZPort" value={formData.ZPort || ""} onChange={handleChange} placeholder="ZPort" />
                <input className ="MaintainerEntryField" name="ZEnd" value={formData.ZEnd || ""} onChange={handleChange} placeholder="ZEnd" />
                <input className ="MaintainerEntryField" name="Comments" value={formData.Comments || ""} onChange={handleChange} placeholder="Comments" />
            </div>
        )}

        {circuitType === "BNet" && (
            <div className ="MaintainerEntry">
                <input className ="MaintainerEntryField" name="POP" value={formData.POP || ""} onChange={handleChange} placeholder="POP" />
                <input className ="MaintainerEntryField" name="SwitchType" value={formData.SwitchType || ""} onChange={handleChange} placeholder="SwitchType" />
                <input className ="MaintainerEntryField" name="CKT_ID" value={formData.CKT_ID || ""} onChange={handleChange} placeholder="CKT_ID" />
                <input className ="MaintainerEntryField" name="Mgmt_IP" value={formData.Mgmt_IP || ""} onChange={handleChange} placeholder="Mgmt_IP" />
            </div>
        )}

        <button className="AddDataButton" onClick={selectedRow ? handleUpdate : handleSubmit}>
        {selectedRow ? 'Update Data' : 'Add Data'}
            </button>
        <button className="DeleteDataButton" onClick={handleDelete} disabled={!selectedRow}>Delete Selected Data</button>
    </div>
    );
}


export default MaintainerForm;