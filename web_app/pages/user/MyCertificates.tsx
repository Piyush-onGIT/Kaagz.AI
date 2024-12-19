import { useEffect, useState } from "react";
import Web3 from "web3";
import styles from "./MyCertificates.module.css";

const MyCertificates = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const contractAddress = "0x24fbB9255673477796e5EbaD7E26E85b6b9c0DE7";

  const myCertificates = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const authorityEmail = localStorage.getItem("email");
      if (!authorityEmail) {
        setErrorMessage("No authority email found in local storage.");
        return;
      }

      // Call the smart contract to get authority data
      const authorityData = await (contract as any).methods
        .getAuthorityData(authorityEmail)
        .call();

      // Map data to URLs
      const urls = authorityData.map(
        (hash: string) => `http://localhost:8080/ipfs/${hash}`
      );
      setLinks(urls);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch authority data.");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div>
      <button className={styles.fetchButton} onClick={myCertificates}>
        My Certificates
      </button>
      {loading && <p className={styles.loadingText}>Loading certificates...</p>}
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

      <div className={styles.gridContainer}>
        {links.map((link, index) => (
          <div key={index} className={styles.tile}>
            <h3 className={styles.title}>Certificate {index + 1}</h3>
            <button
              onClick={() => window.open(link, "_blank", "noopener noreferrer")}
              className={styles.viewButton}
            >
              View Document
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCertificates;
