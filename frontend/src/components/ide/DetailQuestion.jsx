import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";

const DetailQuestion = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const { topic, id } = useParams();

  const [question, setQuestion] = useState(null);

  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [testCasePass, setTestCasePass] = useState("");

  const [closeOutput, setCloseOutput] = useState(false);

  const navigate = useNavigate();

  const handleToggleOutput = () => {
    setCloseOutput(!closeOutput);
  };

  const languageMap = {
    cpp: 54,
    java: 62,
    python: 71,
  };

  const handleRun = async () => {
    try {
      const token = localStorage.getItem("token");

      const language_ID = languageMap[language];

      const response = await axios.post(
        "https://asymptotic2backend-a4ly.onrender.com/api/ide/run-code",
        {
          code: code,
          language_id: language_ID,
          input: input,
        },
      );

      console.log(response);

      if (response) {
        setOutput(response.data.output || "No Output");
        toast.success("code executed");
      } else {
        toast.error("Run failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  const handleSubmit = async () => {
    try {
      const language_id = languageMap[language];
      const testcase = question?.testCases;
      console.log("testcase:", testcase);

      if (!testcase || testcase.length === 0) {
        setTestCasePass("No test cases found");
        toast.error("No test cases available");
        return;
      }

      // 🔥 normalize + compare functions
      const normalize = (val) => {
        if (val === null || val === undefined) return "";

        val = val.toString().trim();

        // try JSON parse (array/object)
        try {
          const parsed = JSON.parse(val);
          return deepNormalize(parsed);
        } catch (e) {}

        // boolean
        if (val.toLowerCase() === "true") return true;
        if (val.toLowerCase() === "false") return false;

        // number
        if (!isNaN(val)) return Number(val);

        // multiline string
        if (val.includes("\n")) {
          return val
            .split("\n")
            .map((line) => line.trim().replace(/\s+/g, " ").toLowerCase());
        }

        // normal string
        return val.toLowerCase().replace(/\s+/g, " ");
      };

      const deepNormalize = (data) => {
        if (Array.isArray(data)) {
          return data.map((item) => deepNormalize(item));
        }

        if (typeof data === "object" && data !== null) {
          const obj = {};
          Object.keys(data)
            .sort()
            .forEach((key) => {
              obj[key] = deepNormalize(data[key]);
            });
          return obj;
        }

        if (typeof data === "string") {
          return data.trim().toLowerCase().replace(/\s+/g, " ");
        }

        return data;
      };

      const isEqual = (a, b) => {
        return JSON.stringify(normalize(a)) === JSON.stringify(normalize(b));
      };

      // 🔁 testcases loop
      for (let i = 0; i < testcase.length; i++) {
        const tc = testcase[i];

        const res = await axios.post(
          "https://asymptotic2backend-a4ly.onrender.com/api/ide/run-code",
          {
            code,
            language_id,
            input: tc.input,
          },
        );

        let userOutput = res.data.output?.trim();
        let expectedOutput = tc.output?.trim();

        console.log("Expected:", expectedOutput);
        console.log("User:", userOutput);

        if (expectedOutput === undefined) {
          setTestCasePass("Expected output missing in DB");
          toast.error("DB error");
          return;
        }

        // 🔥 FINAL FIXED COMPARISON
        if (!isEqual(userOutput, expectedOutput)) {
          setTestCasePass(`Wrong Answer on test case ${i + 1}`);
          toast.error(`Failed on test case ${i + 1}`);
          return;
        }
      }

      setTestCasePass("Accepted");
      toast.success("All test cases passed 🚀");
      navigate("/submitted");
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
      setTestCasePass("Not Passed");
    }
  };

  const [language, setLanguage] = useState("java");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API_URL}/ide/${topic}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuestion(res.data.question);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestion();
  }, [id]);

  return (
    <>
      <div className="h-screen bg-blackBg text-white flex overflow-hidden">
        {/* LEFT SIDE */}
        <div className="w-1/2 h-full overflow-y-auto border-r border-gray-700 p-6 space-y-6">
          {question ? (
            <>
              <div>
                <h1 className="text-2xl font-inter font-bold">
                  {question.title}
                </h1>

                <span
                  className={`inline-block font-roboto font-normal mt-2 text-xs px-3 py-1 rounded-full
                                    ${question.difficulty === "Easy" && "bg-green-500/20 text-green-400"}
                                    ${question.difficulty === "Medium" && "bg-yellow-500/20 text-yellow-400"}
                                    ${question.difficulty === "Hard" && "bg-red-500/20 text-red-400"}
                                `}
                >
                  {question.difficulty}
                </span>
              </div>

              <div>
                <h2 className="text-lg font-inter font-semibold text-white mb-2">
                  Problem Description
                </h2>
                <p className="text-gray-300 font-roboto font-normal whitespace-pre-line leading-relaxed">
                  {question.description}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-roboto font-semibold text-white mb-2">
                  Examples
                </h2>

                {question.examples.map((ex, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-white/10 rounded-xl bg-white/5 backdrop-blur-lg"
                  >
                    <p className="text-sm font-roboto font-normal text-gray-400">
                      Example {index + 1}:
                    </p>
                    <pre className="text-white font-roboto font-normal text-sm mt-2 whitespace-pre-wrap">
                      {`Input: ${ex.input}
Output: ${ex.output}
Explanation: ${ex.explanation}`}
                    </pre>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-lg font-roboto font-semibold text-white mb-2">
                  Constraints
                </h2>

                <ul className="list-disc pl-5 font-roboto font-normal text-gray-300 space-y-1">
                  {question.constraints.map((c, index) => (
                    <li key={index}>{c}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-blackBg backdrop-blur-lg">
            <h2 className="text-lg font-inter font-semibold text-white">
              Code Editor
            </h2>

            <div className="flex items-center gap-3">
              {/* SELECT (IMPROVED) */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-black font-roboto border border-white/10 text-white text-sm px-3 py-1.5 rounded-lg 
                                           focus:border-skyBlue focus:outline-none transition"
              >
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="python">python</option>
              </select>

              {/* RUN BUTTON */}
              <button
                onClick={handleRun}
                className="px-4 py-1.5 bg-redColor rounded-lg text-sm font-roboto font-medium
                                           hover:bg-red-600 hover:scale-105
                                           transition shadow-md shadow-redColor/30"
              >
                Run ▶
              </button>

              {/* SUBMIT BUTTON */}
              <button
                onClick={handleSubmit}
                className="px-4 py-1.5 bg-redColor rounded-lg text-sm font-roboto font-medium
                                           hover:bg-red-600 hover:scale-105
                                           transition shadow-md shadow-redColor/30"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={
                language === "cpp"
                  ? "cpp"
                  : language === "python"
                    ? "python"
                    : "java"
              }
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                wordWrap: "on",
              }}
            />
          </div>

          {/* Output */}
          {output && !closeOutput && (
            <div className="h-40 border-t border-white/10 p-3 overflow-y-auto bg-blackBg backdrop-blur-lg">
              <div className="flex justify-between">
                <p className="text-gray-400 font-roboto font-normal text-sm">
                  Output:
                </p>

                <div
                  className="text-green-400 text-lg cursor-pointer"
                  onClick={handleToggleOutput}
                >
                  <IoIosArrowDown />
                </div>
              </div>

              <div className="text-green-400 font-inter font-medium text-sm mt-2">
                {output}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailQuestion;
