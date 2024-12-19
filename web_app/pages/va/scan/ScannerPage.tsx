// "use client";
import React, { useState, useRef } from "react";
import styles from "./ScannerPage.module.css";
import axios from "axios";
import Report from "./report/Report";
import { TailSpin } from "react-loader-spinner";

const ScannerPage: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [res_api, setRes_api] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const startCamera = async () => {
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Camera access denied or not available", error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData);
      }
    }
    stopCamera();
  };

  const stopCamera = () => {
    setCameraOpen(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleSubmit = async () => {
    if (capturedImage || uploadedFile) {
      try {
        setIsLoading(true); // Start the loader
        let formData = new FormData();

        if (uploadedFile) {
          formData.append("file", uploadedFile);
        } else if (capturedImage) {
          const response = await fetch(capturedImage);
          const blob = await response.blob();
          formData.append("file", blob, "capturedImage.png");
        }

        const res = await axios.post(
          "http://localhost:5002/extract",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(res.data);
        setRes_api(res.data);
        alert("Image submitted successfully!");
      } catch (error) {
        console.error("Error submitting image or file: ", error);
        alert("Failed to submit the image or file.");
      } finally {
        setIsLoading(false); // Stop the loader
        setCapturedImage(null);
        setUploadedFile(null);
      }
    }
  };

  const documents = [
    { id: 1, name: "Birth Certificate" },
    { id: 2, name: "Academic Transcript" },
    { id: 3, name: "Experience Certificate" },
  ];

  return (
    <div className={styles.scannerPage}>
      <div
        className={`${
          isLoading ? "blur-sm z-50" : "blur-0 -z-50"
        }  w-[100%] h-[100%] absolute top-0 left-0 bg-white/30 backdrop-blur-sm transition-all duration-300`}
      ></div>

      <div className={styles.actionSection}>
        <h1 className={styles.title}>Scan or Upload a Document</h1>
        <div className={styles.buttons}>
          <div
            className={styles.scanButtonContainer}
            onClick={() => (cameraOpen ? stopCamera() : startCamera())}
          >
            <div className={styles.scanIcon}></div>
            <p className={styles.scanText}>
              {cameraOpen ? "Stop Camera" : "Scan Document"}
            </p>
          </div>
          <label htmlFor="fileUpload" className={styles.uploadContainer}>
            <div className={styles.uploadIcon}></div>
            <p className={styles.uploadText}>Upload Document</p>
            <input
              type="file"
              id="fileUpload"
              className={styles.hiddenInput}
              onChange={handleFileUpload}
            />
          </label>
        </div>
        {uploadedFile && (
          <div>
            <p className={styles.uploadedFile}>Uploaded: {uploadedFile.name}</p>
            <button className={styles.submitButton} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>

      {cameraOpen && (
        <div className={styles.cameraContainer}>
          <video ref={videoRef} className={styles.videoFeed}></video>
          <canvas ref={canvasRef} className={styles.hiddenCanvas}></canvas>
          <button className={styles.captureButton} onClick={capturePhoto}>
            Capture Photo
          </button>
        </div>
      )}

      {capturedImage && (
        <div className={styles.capturedImageContainer}>
          <h3>Captured Image</h3>
          <img
            src={capturedImage}
            alt="Captured"
            className={styles.capturedImage}
          />
          <button className={styles.submitButton} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      <div className={styles.documentSection}>
        <h2 className={styles.subtitle}>Verify a Document</h2>
        <div className={styles.documentList}>
          {documents.map((doc) => (
            <div key={doc.id} className={styles.documentCard}>
              <div className="block text-[18px] font-semibold">{doc.name}</div>
              <button className={styles.verifyButton}>Verify</button>
            </div>
          ))}
        </div>
      </div>

      <div>{res_api && <Report res_api={res_api} />}</div>
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

export default ScannerPage;
