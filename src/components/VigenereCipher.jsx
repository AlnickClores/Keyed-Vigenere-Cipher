import React, { useState, useEffect } from "react";
import VigenereTable from "./VigenereTable";
import GenerateVigenere from "./GenerateVigenere";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";

const VigenereCipher = () => {
  const [vigenereTableName, setVigenereTableName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [secretMessage, setSecretMessage] = useState("");
  const [mode, setMode] = useState("cipher");
  const [table, setTable] = useState([]);

  const receiveTable = (generatedTable) => {
    setTable(generatedTable);
  };

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "light-mode";
    }
    const userPrefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    return userPrefersLight;
  };

  const [lightMode, setLightMode] = useState(getInitialTheme);

  useEffect(() => {
    const theme = lightMode ? "light-mode" : "dark-mode";
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [lightMode]);

  const handleThemeChange = () => {
    setLightMode((prevMode) => !prevMode);
  };

  return (
    <>
      <div className="navbar">
        {lightMode ? (
          <img
            src={Sun}
            alt="Sun Icon"
            height="40"
            width="40"
            onClick={handleThemeChange}
          />
        ) : (
          <img
            src={Moon}
            alt="Sun Icon"
            height="40"
            width="40"
            onClick={handleThemeChange}
          />
        )}
      </div>

      <h1 className="app-title">Keyed Vigenère Cipher</h1>

      <div className="input-fields">
        <input
          type="text"
          value={vigenereTableName}
          placeholder="Enter Vigenere Table Name"
          onChange={(e) => setVigenereTableName(e.target.value)}
        />
        <label className="labels">Table Name</label>
        <input
          type="text"
          value={keyword}
          placeholder="Enter Keyword"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <label className="labels">Keyword</label>
        <input
          type="text"
          value={secretMessage}
          placeholder={
            mode === "cipher" ? "Enter Secret Message" : "Enter Cipher Text"
          }
          onChange={(e) => setSecretMessage(e.target.value)}
        />
        <label className="labels">
          {mode === "cipher" ? "Secret Message" : "Cipher Text"}
        </label>
        <label className="labels">
          Select Mode:{" "}
          <select
            name="mode"
            id="mode"
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="cipher">Cipher</option>
            <option value="decipher">Decipher</option>
          </select>
        </label>
      </div>
      <VigenereTable
        vigenereTableName={vigenereTableName}
        receiveTable={receiveTable}
      />
      <GenerateVigenere
        vigenereTableName={vigenereTableName}
        keyword={keyword}
        secretMessage={secretMessage}
        mode={mode}
        table={table}
      />
      <div className="footer">
        <p>
          Made by:{" "}
          <a
            href="https://alnickdev.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            Alnick.
          </a>
        </p>
      </div>
    </>
  );
};

export default VigenereCipher;
