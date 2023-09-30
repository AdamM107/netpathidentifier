import React, { useState, useEffect } from 'react';
import '../styles/table.css';
import {fetchAnetCircuits} from "../services/circuits";

function AnetCircuitsList() {
    const [circuits, setCircuits] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const backendURL = process.env.REACT_APP_API_URL;
            const response = await fetch(`${backendURL}/api/anet`);
            const data = await fetchAnetCircuits();
            setCircuits(data);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Anet Circuits</h1>
            <table>
                <thead>
                <tr>
                    <th>POP</th>
                    <th>Device</th>
                    <th>Circuit ID</th>
                    <th>Description</th>
                    <th>A Port</th>
                    <th>Z Port</th>
                    <th>Z End</th>
                    <th>Comments</th>
                </tr>
                </thead>
                <tbody>
                {circuits.map(circuit =>(
                    <tr key={circuit.id}>
                        <td>{circuit.POP}</td>
                        <td>{circuit.Device}</td>
                        <td>{circuit.circuitID}</td>
                        <td>{circuit.description}</td>
                        <td>{circuit.aPort}</td>
                        <td>{circuit.zPort}</td>
                        <td>{circuit.zEnd}</td>
                        <td>{circuit.comments}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}
export default AnetCircuitsList;