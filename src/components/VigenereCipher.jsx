import React, { useState } from "react";
import VigenereTable from "./VigenereTable";
import GenerateVigenere from "./GenerateVigenere";

const VigenereCipher = () => {
  const [vigenereTableName, setVigenereTableName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [secretMessage, setSecretMessage] = useState("");
  const [mode, setMode] = useState("cipher");
  const [table, setTable] = useState([]);

  const receiveTable = (generatedTable) => {
    setTable(generatedTable);
  };

  return (
    <>
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
          <a href="https://alnickdev.netlify.app/" target="_blank">
            Alnick.
          </a>
        </p>
      </div>
    </>
  );
};

export default VigenereCipher;
