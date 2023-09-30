import React, { useState, useEffect } from 'react';
import '../styles/table.css';
import {fetchBnetCircuits} from "../services/circuits";
function BnetCircuitsList() {
    const [circuits, setCircuits] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const backendURL = process.env.REACT_APP_API_URL;
            const response = await fetch(`${backendURL}/api/bnet`);
            const data = await fetchBnetCircuits();
            setCircuits(data);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h2>Bnet Circuits</h2>
            <table>
                <thead>
                <tr>
                    <th>POP</th>
                    <th>Switch Type</th>
                    <th>CKT ID</th>
                    <th>Mgmt IP</th>
                </tr>
                </thead>
                <tbody>
                {circuits.map(circuit => (
                    <tr key={circuit._id}>
                        <td>{circuit.POP}</td>
                        <td>{circuit.SwitchType}</td>
                        <td>{circuit.CKT_ID}</td>
                        <td>{circuit.Mgmt_IP}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BnetCircuitsList;