import netlogo from '../src/assets/netlogo.png';
import NewOxideLogo from '../src/assets/NewOxideLogo.png'
import './App.css';
import '../src/styles/input.css'
import React from 'react';
import AnetCircuitsList from './components/AnetCircuitsList';
import BnetCircuitsList from "./components/BnetCircuitsList";
import MaintainerForm from "./components/MaintainerForm";
import axios from "axios";
import * as app from "react";

function App() {
    const [keyword, setKeyword] = React.useState("");
    const [isMaintainerMode,setMaintainerMode] = React.useState(false);
    const [anetResults, setAnetResults] = React.useState([]);
    const [bnetResults, setBnetResults] = React.useState([]);
    const [showANetResults, setShowANetResults] = React.useState(false);
    const [showBNetResults, setShowBNetResults] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [selectedRowType, setSelectedRowType] = React.useState(null);
    const [formData, setFormData] = React.useState({});
    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

// Search functionality using conditional logic to either show maintainer mode or perform search
function handleSubmit() {
    const backendURL = process.env.REACT_APP_API_URL;
    console.log(backendURL);
    if (keyword === "Test") {
        setMaintainerMode(true);
        console.log("Maintainer Mode Enabled.");
        axios.post(`${backendURL}/searchAll`, { keyword })
            .then(response => {
                setAnetResults(response.data.anetResults);
                setBnetResults(response.data.bnetResults);
                if(response.data.anetResults.length >= 0) {
                    setShowANetResults(true);
                }
                if(response.data.bnetResults.length >= 0) {
                    setShowBNetResults(true);
                }
            });
    } else {
        console.log('Search triggered...');
        axios.post(`${backendURL}/search`, { keyword })
            .then(response => {
                // Handle and display response data
                console.log('Search initiated...');
                setAnetResults(response.data.anetResults);
                setBnetResults(response.data.bnetResults);
                if(response.data.anetResults.length > 0) {
                    setShowANetResults(true);
                }
                if(response.data.bnetResults.length > 0) {
                    setShowBNetResults(true);

                }
                if(response.data.anetResults.length === 0 && response.data.bnetResults.length === 0) {
                    alert('No results found.');
                }


                console.log('ANet Data:', response.data.anetResults);
                console.log('BNet Data:', response.data.bnetResults);
                console.log('Search completed...');
            })
            .catch(error => {
                console.error('Error performing search', error);
            });
    }
}

const fetchData = () => {
    const backendURL = process.env.REACT_APP_API_URL;
    axios.post(`${backendURL}/searchAll`, { keyword: "Test" })
        .then(response => {
            setAnetResults(response.data.anetResults);
            setBnetResults(response.data.bnetResults);
            setShowANetResults(response.data.anetResults.length >= 0);
            setShowBNetResults(response.data.bnetResults.length >= 0);
        })
        .catch(error => {
            console.error('Error fetching data', error);
        })
}

function handleRowClick(row, type) {
    console.log(row);
    setSelectedRow(row);
    setSelectedRowType(type);
}


function handleRowDeleted(deletedRow) {
    setAnetResults(anetResults.filter(row => row !== deletedRow));
    setBnetResults(bnetResults.filter(row => row !== deletedRow));
}

    const handleClear = () => {
        setFormData({});
        setSelectedRow(null);
    }

    return (
        <div className="App">
            <header>
                <img src={NewOxideLogo} className="Company-logo" alt="company" />
            </header>
            <header className="App-header">
                <p className="Demo-Disclaimer">Important: This web application is a public demo version showcasing only the core features of the full application.
                    To protect the privacy and integrity of the original client, all data shown is fictional. <br></br>The original application is not designed for mobile use, and visual defects may occur.</p>
                <img src={netlogo} className="App-logo" alt="logo"/>
                <h3>Network Circuit Path Identifier </h3>
                <p>Enter any available circuit information, such as a Circuit ID. </p><br></br>
                <p className="maintainerDesc">To manage all circuit information, enter "Test" below, and submit.</p>
                <input className="searchBar" type="text" value={keyword} onChange={handleKeywordChange}/>
                {isMaintainerMode ? (
                    <React.Fragment>
                        <MaintainerForm
                            selectedRow={selectedRow}
                            selectedRowType={selectedRowType}
                            onRowDeleted={handleRowDeleted}
                            formData={formData}
                            setFormData={setFormData}
                            fetchData={fetchData}
                        />
                        <button className="ExtMaintButton" onClick={() => window.location.reload()}>Exit Maintainer
                            Mode
                        </button>
                    </React.Fragment>
                    // Maintainer mode button

                ) : (
                    <button className="SubmitButton" onClick={handleSubmit}>Submit</button>
                )}
                <button className="ClearButton" onClick={handleClear} style={{opacity: selectedRow ? 1 : 0.2}}>Clear
                    Selection
                </button>

            </header>
            {showANetResults && (
                <>
                <ul className="results-list">
                    <h3>ANet:</h3>
                <li className="header-row">
                    <span>POP</span>
                    <span>Device</span>
                    <span>CircuitID</span>
                    <span>Description</span>
                    <span>APort</span>
                    <span>ZPort</span>
                    <span>ZEnd</span>
                    <span>Comments</span>
                </li>
                {anetResults.map((result, index) => (
                    <li key={index} onClick={() => handleRowClick(result, 'ANet')} className={selectedRow === result ? 'selected-row' : ''}>
                        <span>{result.POP}</span>
                        <span>{result.Device}</span>
                        <span>{result.CircuitID}</span>
                        <span>{result.Description}</span>
                        <span>{result.APort}</span>
                        <span>{result.ZPort}</span>
                        <span>{result.ZEnd}</span>
                        <span>{result.Comments}</span>

                    </li>
                ))}
            </ul>
                </>
                    )}
                    {showBNetResults && (
                        <>
                    <ul className={"results-list"}>
                        <h3>BNet:</h3>
                        <li className={"header-row"}>
                            <span>POP</span>
                            <span>Switch Type</span>
                            <span>CKT_ID</span>
                            <span>Mgmt_IP</span>
                        </li>
                        {bnetResults.map((result, index) => (
                            <li key={index} onClick={() => handleRowClick(result, 'BNet')} className={selectedRow === result ? 'selected-row' : ''}>
                                <span>{result.POP}</span>
                                <span>{result.SwitchType}</span>
                                <span>{result.CKT_ID}</span>
                                <span>{result.Mgmt_IP}</span>
                            </li>
                        ))}
                    </ul>
                        </>
                        )}
        </div>
    );

}

export default App;
