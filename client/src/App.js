import { useState, useEffect } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import stubs from "./defaultStubs";
import "./App.css";

const editorOptions = {
  scrollBeyondLastLine: false,
  fontSize: "14px",
  folding: false,
  // lineDecorationsWidth: 15,
};

const inputOptions = {
  minimap: { enabled: false },
  automaticLayout: true,
  scrollBeyondLastLine: false,
  fontSize: "14px",
  lineDecorationsWidth: 5,
};
const outputOptions = {
  minimap: { enabled: false },
  automaticLayout: true,
  scrollBeyondLastLine: false,
  fontSize: "14px",
  lineDecorationsWidth: 5,
};

function App() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [runningStatus, setRunningStatus] = useState(false);

  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

  const handleSubmit = async () => {
    const payload = {
      lang: language,
      src: window.btoa(code),
      input: window.btoa(input),
    };
    try {
      //   setJobId("");
      setRunningStatus(true);
      //   setJobDetails(null);
      setOutput(`Code Execution Status: Running`);
      const { data } = await axios.post(
        `${process.env.REACT_APP_REQUEST_URL}/submit`,
        payload
      );
      console.log(data);
      checkStatus(data.submission_id);
    } catch ({ response }) {
      if (response) {
        const errorMessage = response.data.err.stderr;
        setOutput(errorMessage);
      } else {
        setOutput("Error connecting to server!");
      }
      setRunningStatus(false);
    }
  };

  const checkStatus = async (submission_id) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_REQUEST_URL}/status/${submission_id}`
    );
    if (data.status === "queued") {
      setTimeout(() => {
        checkStatus(submission_id);
      }, 2000);
      return;
    } else {
      if (data.stderr) {
        setOutput(data.stderr);
      } else if (data.stdout) {
        setOutput(data.stdout);
      } else {
        setOutput("Some Error Occured");
      }
      setRunningStatus(false);
    }
  };

  return (
    <div id="App" className="App-dark">
      <div id="header" className="header-dark">
        <h3 id="app-name" className="app-name-dark">
          <i className="fas fa-solid fa-cube" aria-hidden="true"></i>
          &nbsp; Online Code Runner
        </h3>
      </div>

      <div className="secondary-nav-items">
        <button id="language-button" className="language-button-dark">
          <select
            value={language}
            onChange={(e) => {
              setRunningStatus(false);
              setLanguage(e.target.value);
              setCode(stubs[e.target.value]);
            }}
          >
            <option value={"python"}>Python</option>
            <option value={"cpp"}>C++</option>
          </select>
        </button>
        {/* run button */}
        <button
          className="btn run-btn"
          onClick={handleSubmit}
          disabled={runningStatus ? true : false}
        >
          <i className="fas fa-play fa-fade run-icon" aria-hidden="true"></i>
          &nbsp; Run
        </button>
      </div>

      <div className="main-hero">
        <div className="editor">
          <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            defaultLanguage={language}
            defaultValue={code}
            value={code}
            onChange={(e) => setCode(e)}
            options={editorOptions}
            language={language}
          />
        </div>
        <div className="std-input-output">
          <div className="std-input">
            <h3>Input</h3>
            <Editor
              height="100%"
              width="100%"
              theme="vs-dark"
              defaultLanguage="plaintext"
              value={input}
              options={inputOptions}
              onChange={(e) => setInput(e)}
            />
          </div>
          <div className="std-output">
            <h3>Output</h3>
            <Editor
              height="100%"
              width="100%"
              theme="vs-dark"
              defaultLanguage="plaintext"
              value={output}
              options={outputOptions}
              wordWrap
            />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default App;
