import { useEffect, useState } from "react";
import Web3 from "web3";
import styles from "./MyCertificates.module.css";

const MyCertificates = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [certificates, setCertificates] = useState<Object[]>([]);
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

  const contractAddress = "0xF0298D283037BAf35f07A62EbFf04FA66EAaCa00";

  const myCertificates = async () => {
    setCertificates([]);
    try {
      setLoading(true);
      setErrorMessage("");
      const authorityEmail = localStorage.getItem("email");
      const type = localStorage.getItem("type");

      if (!authorityEmail) {
        setErrorMessage("No authority email found in local storage.");
        return;
      }

      if (type !== "individual") {
        // Call the smart contract to get authority data
        const authorityData = await (contract as any).methods
          .getAuthorityData(authorityEmail)
          .call();

        const individualKeys = await (contract as any).methods
          .getIndividualKeys()
          .call();

        console.log(authorityData);
        let tmpCerti = [];

        for (let i = 0; i < authorityData.length; i++) {
          console.log(authorityData[i]);
          const hash = authorityData[i];

          for (let j = 0; j < individualKeys.length; j++) {
            const user = individualKeys[j];
            const individualData = await (contract as any).methods
              .getIndividualData(user)
              .call();

            if (individualData.includes(hash)) {
              tmpCerti.push({
                link: `http://localhost:8080/ipfs/${hash}`,
                issuedTo: user,
              });
            }
          }
        }

        setCertificates(tmpCerti);
      } else {
        const authorityData = await (contract as any).methods
          .getIndividualData(authorityEmail)
          .call();

        let tmpCerti = [];

        for (let i = 0; i < authorityData.length; i++) {
          tmpCerti.push({
            link: `http://localhost:8080/ipfs/${authorityData[i]}`,
            issuedTo: "me",
          });
        }
        setCertificates(tmpCerti);
      }
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
    <div className={styles.gridContainer}>
      <button className={styles.fetchButton} onClick={myCertificates}>
        My Certificates
      </button>

      {loading && <p className={styles.loadingText}>Loading certificates...</p>}
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

      <div className={styles.grid}>
        {certificates.map((data: any, index) => (
          <div key={index} className={styles.tile}>
            Issued to: <h3 className={styles.tileTitle}>{data.issuedTo}</h3>
            <button
              className={styles.tileButton}
              onClick={() =>
                window.open(data.link, "_blank", "noopener noreferrer")
              }
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
