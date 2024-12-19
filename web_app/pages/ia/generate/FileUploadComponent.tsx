import React, { useEffect, useState } from "react";
import Web3 from "web3";
import styles from "./FileUpload.module.css";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const FileUploadComponent: React.FC = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const [authorityKey, setAuthorityKey] = useState("");
  const [individualKey, setIndividualKey] = useState("");
  const [authorityValues, setAuthorityValues] = useState([]);
  const [individualValues, setIndividualValues] = useState([]);
  const [newAuthorityValue, setNewAuthorityValue] = useState("");
  const [newIndividualValue, setNewIndividualValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const contractABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "key",
          type: "string",
        },
      ],
      name: "getAuthorityData",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAuthorityKeys",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "key",
          type: "string",
        },
      ],
      name: "getIndividualData",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getIndividualKeys",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "key",
          type: "string",
        },
        {
          internalType: "string",
          name: "value",
          type: "string",
        },
      ],
      name: "pushValueToAuthorityData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "key",
          type: "string",
        },
        {
          internalType: "string",
          name: "value",
          type: "string",
        },
      ],
      name: "pushValueToIndividualData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "key",
          type: "string",
        },
        {
          internalType: "string[]",
          name: "values",
          type: "string[]",
        },
      ],
      name: "setAuthorityData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "key",
          type: "string",
        },
        {
          internalType: "string[]",
          name: "values",
          type: "string[]",
        },
      ],
      name: "setIndividualData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contractAddress = "0xF0298D283037BAf35f07A62EbFf04FA66EAaCa00";

  useEffect(() => {
    const initWeb3 = async () => {
      const winEth = (window as any).ethereum;
      if (winEth) {
        const web3Instance: any = new Web3(winEth);
        await winEth.request({ method: "eth_requestAccounts" });
        setWeb3(web3Instance);

        const userAccounts: any = await web3Instance.eth.getAccounts();
        setAccounts(userAccounts);

        const contractInstance: any = new web3Instance.eth.Contract(
          contractABI,
          contractAddress
        );
        setContract(contractInstance);
      } else {
        alert("Please install MetaMask to use this feature!");
      }
    };

    initWeb3();
  }, []);

  // State for file and email
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // Handle email input change
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrorMessage("");
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    const authorityEmail = localStorage.getItem("email");
    event.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!file) {
      setErrorMessage("Please upload a file.");
      return;
    }

    if (!contract) {
      alert("Smart contract not initialized. Please try again.");
      return;
    }

    try {
      // Step 1: Upload the file to your server and get the IPFS path
      const formData = new FormData();
      formData.append("file", file);
      formData.append("issuedTo", email);

      const response = await fetch("http://localhost:5002/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const result = await response.json();
      const ipfsPath = result.ipfsPath;
      console.log(`File uploaded successfully! IPFS Path: ${ipfsPath}`);

      // Step 2: Interact with the blockchain to check and update the key-value
      const existingAuthorityKeys = await (contract as any).methods
        .getAuthorityKeys()
        .call();

      if (existingAuthorityKeys.includes(authorityEmail)) {
        console.log(
          `Email '${authorityEmail}' already exists. Pushing new IPFS path...`
        );
        await (contract as any).methods
          .pushValueToAuthorityData(authorityEmail, ipfsPath)
          .send({ from: accounts[0] });
        alert(`IPFS path added to the existing email key.`);
      } else {
        console.log(
          `Email '${authorityEmail}' does not exist. Setting new key-value pair...`
        );
        await (contract as any).methods
          .setAuthorityData(authorityEmail, [ipfsPath])
          .send({ from: accounts[0] });
        alert(`Email and IPFS path set successfully.`);
      }

      // insert into individual's array
      const existingIndividualKeys = await (contract as any).methods
        .getIndividualKeys()
        .call();

      if (existingIndividualKeys.includes(email)) {
        console.log(
          `Email '${email}' already exists. Pushing new IPFS path...`
        );
        await (contract as any).methods
          .pushValueToIndividualData(email, ipfsPath)
          .send({ from: accounts[0] });
        alert(`IPFS path added to the existing email key.`);
      } else {
        console.log(
          `Email '${email}' does not exist. Setting new key-value pair...`
        );
        await (contract as any).methods
          .setIndividualData(email, [ipfsPath])
          .send({ from: accounts[0] });
        alert(`Email and IPFS path set successfully.`);
      }

      // call the verify api
      setIsLoading(true); // Start the loader
      const formData1 = new FormData();
      formData1.append("file", file);

      const res = await axios.post("http://localhost:5002/extract", formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.isVerified) {
        alert("Verified");
        setIsLoading(false); // Start the loader
      } else {
        alert("Not verified");
        setIsLoading(false); // Start the loader
      }

      // Step 3: Reset the form
      setFile(null);
      setEmail("");
    } catch (error) {
      console.error(error);
      alert("Error uploading file or interacting with the blockchain.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>File Upload</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fileUpload" className={styles.label}>
            Upload File:
          </label>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            className={styles.inputFile}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Issued to (Email):
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.inputText}
            required
          />
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Upload
        </button>
      </form>
      {isLoading && ( // Display the loader when isLoading is true
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[999]">
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
