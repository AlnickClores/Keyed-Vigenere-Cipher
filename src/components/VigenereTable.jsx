import React, { useState, useEffect } from "react";

const VigenereTable = ({ vigenereTableName, receiveTable }) => {
  const [table, setTable] = useState([]);

  useEffect(() => {
    generateVigenereTable();
  }, [vigenereTableName]);

  const generateVigenereTable = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const filteredAlphabet = alphabet
      .split("")
      .filter((letter) => !vigenereTableName.includes(letter))
      .join("");
    const newTable = [];

    let tableRow = vigenereTableName + filteredAlphabet;
    for (let i = 0; i < 26; i++) {
      newTable.push(tableRow);
      tableRow = tableRow.slice(1) + tableRow[0];
    }
    setTable(newTable);
    receiveTable(newTable);
  };

  return (
    <div className="table-container">
      <h1 className="table-title">Your Vigenere {vigenereTableName} Table</h1>
      <div className="vigenere-table">
        <table>
          <tbody>
            {table.map((row, index) => (
              <tr key={index}>
                {row.split("").map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VigenereTable;
