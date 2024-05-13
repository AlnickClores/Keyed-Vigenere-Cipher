import React, { useState } from "react";

const GenerateVigenere = (props) => {
  const [cipherText, setCipherText] = useState("");
  const [decipherText, setDecipherText] = useState("");
  const [keystream, setKeystream] = useState("");

  const generateKeyStream = ({ keyword, secretMessage }) => {
    if (!keyword || !secretMessage) {
      return "";
    }

    const cleanedKeyword = keyword.replace(/\s/g, "");
    const cleanedSecretMessage = secretMessage.replace(/\s/g, "");
    const keywordLength = cleanedKeyword.length;
    const secretMessageLength = cleanedSecretMessage.length;

    let keyStream = "";

    for (let i = 0; i < secretMessageLength; i++) {
      keyStream += cleanedKeyword[i % keywordLength];
    }

    setKeystream(keyStream);
  };

  const generateCipherText = ({ table, secretMessage, keystream }) => {
    if (!table || !table.length || !secretMessage || !keystream) {
      return "";
    }

    const cleanedSecretMessage = secretMessage.replace(/\s/g, "");

    let cipherText = "";
    for (let i = 0; i < cleanedSecretMessage.length; i++) {
      const keystreamChar = keystream[i % keystream.length];
      let rowIndex = 0;
      let colIndex = 0;

      while (table[rowIndex][0] !== keystreamChar) {
        rowIndex++;
      }

      while (table[0][colIndex] !== cleanedSecretMessage[i]) {
        colIndex++;
      }
      cipherText += table[rowIndex][colIndex];
    }
    setCipherText(cipherText);
  };

  const handleGenerateCipherText = () => {
    generateKeyStream({
      keyword: props.keyword,
      secretMessage: props.secretMessage,
    });
    generateCipherText({
      table: props.table,
      secretMessage: props.secretMessage,
      keystream: keystream,
    });
  };

  const generateSecretText = ({ table, secretMessage, keystream }) => {
    if (!table || !table.length || !secretMessage || !keystream) {
      return "";
    }

    const cleanedSecretMessage = secretMessage.replace(/\s/g, "");

    let decipherText = "";
    for (let i = 0; i < cleanedSecretMessage.length; i++) {
      if (cleanedSecretMessage[i] === " ") {
        decipherText += " ";
      } else {
        const keystreamChar = keystream[i % keystream.length];
        let rowIndex = 0;

        while (table[rowIndex][0] !== keystreamChar) {
          rowIndex++;
          if (rowIndex >= table.length) {
            break;
          }
        }

        if (rowIndex < table.length) {
          const colIndex = table[rowIndex].indexOf(cleanedSecretMessage[i]);
          decipherText += table[0][colIndex];
        }
      }
    }
    setDecipherText(decipherText);
  };

  const handleGenerateSecretText = () => {
    generateKeyStream({
      keyword: props.keyword,
      secretMessage: props.secretMessage,
    });
    generateSecretText({
      table: props.table,
      secretMessage: props.secretMessage,
      keystream: keystream,
    });
  };

  return (
    <div className="output-container">
      {props.mode === "cipher" ? (
        cipherText ? (
          <div className="output-inner-container">
            <p className="output">{cipherText}</p>
            <h1 className="output-title">Cipher Text</h1>
          </div>
        ) : null
      ) : decipherText ? (
        <div className="output-inner-container">
          <p className="output">{decipherText}</p>
          <h1 className="output-title">Secret Message</h1>
        </div>
      ) : null}

      <button
        className="generate-button"
        onClick={
          props.mode === "cipher"
            ? handleGenerateCipherText
            : handleGenerateSecretText
        }
      >
        Generate {props.mode === "cipher" ? "Cipher Text" : "Secret Message"}
      </button>
    </div>
  );
};

export default GenerateVigenere;
