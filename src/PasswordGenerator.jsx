import React, { useState } from "react";

const PasswordGenerator = () => {
  const [pass, setPass] = useState("");
  const [passLen, setPassLen] = useState(8);
  const [passStrength, setPassStrength] = useState("");
  const [score, setScore] = useState(0);

  //   Generate Random Password
  const GenPass = (e) => {
    e.preventDefault();
    const len = passLen;
    const List = [
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "_@#$%&*",
      "0123456789",
      "abcdefghijklmnopqrstuvwxyz",
    ];
    let characterList = "";
    var result = "";
    for (let i = 0; i < len; i++) {
      if (i < 4) characterList = List[i];
      let ran = Math.floor(Math.random() * 4);
      if (i > 4) characterList = List[ran];
      result += characterList.charAt(
        Math.floor(Math.random() * characterList.length)
      );
    }
    setPass(result);
    validate(result);
  };

  const MeasureStrength = (pass, errorMessage) => {
    let score = 0;
    let passStrength = "";
    let regexPositive = ["[A-Z]", "[a-z]", "[0-9]", "[_@#$%&*!]"];
    regexPositive.forEach((regex, index) => {
      if (new RegExp(regex).test(pass)) {
        score += 1;
      }
    });

    switch (score) {
      case 0:
      case 1:
        passStrength = "weak";
        break;
      case 2:
      case 3:
        passStrength = "good";
        break;
      case 4:
      case 5:
        passStrength = "strong";
        break;
      default:
        break;
    }
    setScore(score);
    if (!errorMessage) {
      if (score === 4) score += 1;
      setScore(score);
      setPassStrength(passStrength);
    }
  };

  // Validate
  const validate = (value) => {
    let password = value;
    let errorMessage;
    let capsCount, smallCount, numberCount, symbolCount;
    if (password.length < 8) {
      errorMessage = "password must be min 8 char";
      setPassStrength(errorMessage);
      MeasureStrength(password, errorMessage);
    } else {
      capsCount = (password.match(/[A-Z]/g) || []).length;
      smallCount = (password.match(/[a-z]/g) || []).length;
      numberCount = (password.match(/[0-9]/g) || []).length;
      symbolCount = (password.match(/[_@#$%&*!]/g) || []).length;
      if (capsCount < 1) {
        errorMessage = "must contain caps";
      } else if (smallCount < 1) {
        errorMessage = "must contain small";
      } else if (numberCount < 1) {
        errorMessage = "must contain number";
      } else if (symbolCount < 1) {
        errorMessage = "must contain symbol";
      } else errorMessage = "";
      setPassStrength(errorMessage);
      MeasureStrength(password, errorMessage);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <h1>PassWord Generator</h1>

      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          width: "51%",
          margin: "auto",
          height: "30%",
          boxShadow: "1px 1px inset brown",
        }}
      >
        <select
          type="number"
          value={passLen}
          onChange={(e) => setPassLen(e.target.value)}
          style={{
            height: "35px",
            textAlign: "center",
            width: "100px",
            padding: "0px 0px 0px 10px",
            margin: "20px",
          }}
        >
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="12">12</option>
        </select>
        <button
          onClick={GenPass}
          style={{
            backgroundColor: "#0275d8",
            border: "none",
            color: "#fff",
            height: "35px",
            padding: "5px",
            width: "90px",
          }}
        >
          Generate
        </button>
        <br />
        <input
          type="text"
          name="pass"
          id="pass"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
            validate(e.target.value);
          }}
          style={{
            minWidth: "200px",
            margin: "0 10px",
            padding: "5px",
            color: "#fff",
            background: "#2f2b2b",
            minHeight: "50px",
            textAlign: "center",
            fontSize: "1.3rem",
            letterSpacing: "2px",
          }}
        />
        <button
          disabled={pass.length < 8 ? true : false}
          onClick={() => {
            navigator.clipboard.writeText(pass);
            alert("text Copied");
          }}
          style={{
            backgroundColor: pass.length < 8 ? "#fff" : "#0275d8",
            border: "none",
            color: "#fff",
            minHeight: "50px",
            padding: "5px",
            width: "120px",
          }}
        >
          Copy Password
        </button>
        <br />
        <div>{passStrength}</div> <br />
        <meter
          value={score}
          min="0"
          max="5"
          low="3"
          optimum="4"
          style={{
            width: "80%",
            height: "1.2rem",
          }}
        >
          {" "}
        </meter>
        <br></br>
      </div>
    </div>
  );
};

export default PasswordGenerator;
