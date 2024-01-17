// Documents.js

import React, { useState } from "react";
import "./Documents.css"; // Import your CSS for styling
import axios from "axios";
<<<<<<< HEAD
import FormData from "form-data";
import { Link } from "react-router-dom";

const JWT = `Bearer ${process.env.JWT}`;
=======
import { Link } from "react-router-dom";
import JWT from "../../SECRET";

>>>>>>> e31340d4962d2d5f2b2241887c843aa0e2bdee7b
const Documents = () => {
    const [anonymous, setAnonymous] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState();
    const [companyName, setCompanyName] = useState("");
    const [additionalInformation, setAdditionalInformation] = useState("");
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [companies] = useState([
        "Bata",
        "BananaChips Inc.",
        // Add more company names here
    ]);
    const [recommendation, setRecommendation] = useState("");

    const handleAnonymousChange = () => {
        setAnonymous(!anonymous);
    };

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files[0]);
    };

    const handleCompanyNameChange = (event) => {
        const input = event.target.value;
        setCompanyName(input);

        const filtered = companies.filter((company) =>
            company.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredCompanies(filtered);

        // Provide recommendations based on common complaints
        if (input.toLowerCase() === "bata") {
            setRecommendation(
                "Common complaints involve product quality concerns. Focus on improving quality control measures to enhance customer satisfaction."
            );
        } else if (input.toLowerCase() === "bananachips inc.") {
            setRecommendation("usually pakaging issues");
        } else {
            setRecommendation("");
        }
    };

    const handleCompanySelection = (selectedCompany) => {
        setCompanyName(selectedCompany);
        setFilteredCompanies([]);
    };

    const handleAdditionalInformationChange = (event) => {
        const info = event.target.value;
        setAdditionalInformation(info);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("file", selectedFiles);

        const metadata = JSON.stringify({
            name: "File name",
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({
            cidVersion: 0,
        });
        formData.append("pinataOptions", options);

        try {
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    maxBodyLength: "Infinity",
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
<<<<<<< HEAD
                        Authorization: JWT,
=======
                        "Authorization": `Bearer ${JWT}`,
>>>>>>> e31340d4962d2d5f2b2241887c843aa0e2bdee7b
                    },
                }
            );
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="documents-container">
            <h2>File a Complaint</h2>
            <form onSubmit={handleSubmit} className="complaint-form">
                <div className="form-group">
                    <label>
                        Company Name:
                        <input
                            type="text"
                            value={companyName}
                            onChange={handleCompanyNameChange}
                        />
                        {filteredCompanies.length > 0 && (
                            <ul className="autocomplete-list">
                                {filteredCompanies.map((company) => (
                                    <li
                                        key={company}
                                        onClick={() =>
                                            handleCompanySelection(company)
                                        }
                                    >
                                        {company}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </label>
                    {recommendation && (
                        <p className="recommendation">{recommendation}</p>
                    )}
                </div>
                <div className="form-group">
                    <label>
                        Attach Files:
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        File anonymously:
                        <input
                            type="checkbox"
                            checked={anonymous}
                            onChange={handleAnonymousChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>Additional Information (Optional):</label>
                    <textarea
                        rows="4"
                        value={additionalInformation}
                        onChange={handleAdditionalInformationChange}
                        style={{ width: "425px" }}
                    />
                </div>
                {/* <Link to="/help"> */}
                <button type="submit" className="submit-button">
                    Submit
                </button>
                {/* </Link> */}
            </form>
        </div>
    );
};

export default Documents;
