import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "../style/style.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import { authStore } from "../store/auth.store";

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [groups, setGroups] = useState([]); // State to hold groups
  const [isUpdateWindowVisible, setIsUpdateWindowVisible] = useState(false);
  const [isPostWindowVisible, setIsPostWindowVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedQuestion, setUpdatedQuestion] = useState("");
  const [updatedAnswer, setUpdatedAnswer] = useState("");
  const [updatedHint, setUpdatedHint] = useState("");
  const [updatedScore, setUpdatedScore] = useState("");
  const [updatedGroup, setUpdatedGroup] = useState("");
  const [updatedLoginDetail, setUpdatedLoginDetail] = useState("");
  const [newTestName, setNewTestName] = useState("");
  const [newTestQuestion, setNewTestQuestion] = useState("");
  const [newTestAnswer, setNewTestAnswer] = useState("");
  const [newTestHint, setNewTestHint] = useState("");
  const [newTestScore, setNewTestScore] = useState("");
  const [newTestGroup, setNewTestGroup] = useState("");
  const [newTestLoginDetail, setNewTestLoginDetail] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  // Fetch groups from API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "https://ctfhawksbackend.onrender.com/api/groups",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, [accessToken]);

  // Fetch tests from API
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(
          "https://ctfhawksbackend.onrender.com/api/tests",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Map through tests and replace group ID with group name
        const testsWithGroupNames = response.data.map((test) => {
          const group = groups.find((group) => group._id === test.group);
          return {
            ...test,
            groupName: group ? group.name : "Unknown Group", // Add groupName field
          };
        });

        setTests(testsWithGroupNames);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    if (groups.length > 0) {
      fetchTests();
    }
  }, [groups, accessToken]);

  const handleUpdateClick = (test) => {
    setSelectedTest(test);
    setUpdatedName(test.name);
    setUpdatedQuestion(test.question);
    setUpdatedAnswer(test.answer);
    setUpdatedHint(test.hint);
    setUpdatedScore(test.score);
    setUpdatedGroup(test.group); // Set group ID for update
    setUpdatedLoginDetail(test.logindetail);
    setIsUpdateWindowVisible(true);
    setIsPostWindowVisible(false);
  };

  const handlePostClick = () => {
    setIsUpdateWindowVisible(false);
    setIsPostWindowVisible(true);
  };

  const handlePostClose = () => {
    setIsUpdateWindowVisible(false);
    setIsPostWindowVisible(false);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: updatedName,
      question: updatedQuestion,
      answer: updatedAnswer,
      hint: updatedHint,
      score: updatedScore,
      group: updatedGroup,
      logindetail: updatedLoginDetail,
    };

    try {
      await axios.put(
        `https://ctfhawksbackend.onrender.com/api/tests/${selectedTest._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedTests = await axios.get(
        "https://ctfhawksbackend.onrender.com/api/tests",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setTests(updatedTests.data);
      setIsUpdateWindowVisible(false);
    } catch (error) {
      console.error("Error updating test:", error);
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: newTestName,
      question: newTestQuestion,
      answer: newTestAnswer,
      hint: newTestHint,
      score: newTestScore,
      group: newTestGroup,
      logindetail: newTestLoginDetail,
    };

    try {
      const response = await axios.post(
        "https://ctfhawksbackend.onrender.com/api/tests",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTests([...tests, response.data]);
      setIsPostWindowVisible(false);
      setNewTestName("");
      setNewTestQuestion("");
      setNewTestAnswer("");
      setNewTestHint("");
      setNewTestScore("");
      setNewTestGroup("");
      setNewTestLoginDetail("");
    } catch (error) {
      console.error("Error adding test:", error);
    }
  };

  const handleDeleteTest = async (testId) => {
    try {
      await axios.delete(
        `https://ctfhawksbackend.onrender.com/api/tests/${testId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setTests((prevTests) => prevTests.filter((test) => test._id !== testId));
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const handleLogout = () => {
    authStore.logout();
  };

  return (
    <div className="App">
      <input type="checkbox" id="menu-toggle" />
      <Sidebar />

      <div className="main-content">
        <header>
          <div className="header-content">
            <label htmlFor="menu-toggle">
              <span className="las la-bars"></span>
            </label>
            <div className="header-menu">
              <label>
                <span className="las la-search"></span>
              </label>
              <div className="notify-icon">
                <span className="las la-envelope"></span>
                <span className="notify">4</span>
              </div>
              <div className="notify-icon">
                <span className="las la-bell"></span>
                <span className="notify">3</span>
              </div>
              <div className="user">
                <div
                  className="bg-img"
                  style={{ backgroundImage: "url(img/1.jpeg)" }}
                ></div>
                <span>
                  <button className="logout-button" onClick={handleLogout}>
                    <span className="las la-power-off"></span>
                    Logout
                  </button>
                </span>
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="page-header">
            <h1>Tests</h1>
          </div>

          <div className="page-content">
            <div className="records table-responsive">
              <div className="record-header">
                <div className="add">
                  <span>Entries</span>
                  <select>
                    <option>ID</option>
                  </select>
                  <button onClick={handlePostClick}>Add record</button>
                </div>
                <div className="browse">
                  <input
                    type="search"
                    placeholder="Search"
                    className="record-search"
                  />
                  <select>
                    <option>Status</option>
                  </select>
                </div>
              </div>

              <div>
                <table width="100%">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Question</th>
                      <th>Score</th>
                      <th>Group</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((test) => (
                      <tr key={test._id}>
                        <td>{test.name}</td>
                        <td>{test.question}</td>
                        <td>{test.score}</td>
                        <td>{test.groupName}</td> {/* Display group name */}
                        <td>
                          <div className="actions">
                            <span>
                              <FaRegEdit
                                className="la-edit"
                                onClick={() => handleUpdateClick(test)}
                              />
                              {isUpdateWindowVisible &&
                                selectedTest &&
                                selectedTest._id === test._id && (
                                  <div className="update-window">
                                    <form onSubmit={handleUpdateSubmit}>
                                      <h2>Update Test</h2>
                                      <label>
                                        Name:
                                        <input
                                          type="text"
                                          value={updatedName}
                                          onChange={(e) =>
                                            setUpdatedName(e.target.value)
                                          }
                                        />
                                      </label>
                                      <label>
                                        Question:
                                        <textarea
                                          value={updatedQuestion}
                                          onChange={(e) =>
                                            setUpdatedQuestion(e.target.value)
                                          }
                                        ></textarea>
                                      </label>
                                      <label>
                                        Answer:
                                        <textarea
                                          value={updatedAnswer}
                                          onChange={(e) =>
                                            setUpdatedAnswer(e.target.value)
                                          }
                                        ></textarea>
                                      </label>
                                      <label>
                                        Hint:
                                        <textarea
                                          value={updatedHint}
                                          onChange={(e) =>
                                            setUpdatedHint(e.target.value)
                                          }
                                        ></textarea>
                                      </label>
                                      <label>
                                        Score:
                                        <input
                                          type="number"
                                          value={updatedScore}
                                          onChange={(e) =>
                                            setUpdatedScore(e.target.value)
                                          }
                                        />
                                      </label>
                                      <label>
                                        Group:
                                        <select
                                          className="test-select"
                                          value={updatedGroup}
                                          onChange={(e) =>
                                            setUpdatedGroup(e.target.value)
                                          }
                                        >
                                          <option value="">Select Group</option>
                                          {groups.map((group) => (
                                            <option
                                              key={group._id}
                                              value={group._id}
                                            >
                                              {group.name}
                                            </option>
                                          ))}
                                        </select>
                                      </label>
                                      <label>
                                        Login Detail:
                                        <textarea
                                          value={updatedLoginDetail}
                                          onChange={(e) =>
                                            setUpdatedLoginDetail(
                                              e.target.value
                                            )
                                          }
                                        ></textarea>
                                      </label>
                                      <button type="submit">Update</button>
                                      <button
                                        onClick={() => handlePostClose()}
                                        style={{
                                          backgroundColor: "red",
                                          marginTop: "10px",
                                        }}
                                        type="button"
                                      >
                                        Close
                                      </button>
                                    </form>
                                  </div>
                                )}
                            </span>
                            <span>
                              <FaTrash
                                className="la-trash"
                                onClick={() => handleDeleteTest(test._id)}
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {isPostWindowVisible && (
                <div className="post-window">
                  <form onSubmit={handlePostSubmit}>
                    <h2>Add Test</h2>
                    <label>
                      Name:
                      <input
                        type="text"
                        value={newTestName}
                        onChange={(e) => setNewTestName(e.target.value)}
                      />
                    </label>
                    <label>
                      Question:
                      <textarea
                        value={newTestQuestion}
                        onChange={(e) => setNewTestQuestion(e.target.value)}
                      ></textarea>
                    </label>
                    <label>
                      Answer:
                      <textarea
                        value={newTestAnswer}
                        onChange={(e) => setNewTestAnswer(e.target.value)}
                      ></textarea>
                    </label>
                    <label>
                      Hint:
                      <textarea
                        value={newTestHint}
                        onChange={(e) => setNewTestHint(e.target.value)}
                      ></textarea>
                    </label>
                    <label>
                      Score:
                      <input
                        type="number"
                        value={newTestScore}
                        onChange={(e) => setNewTestScore(e.target.value)}
                      />
                    </label>
                    <label>
                      Group:
                      <select
                        className="test-select"
                        value={newTestGroup}
                        onChange={(e) => setNewTestGroup(e.target.value)}
                      >
                        <option value="">Select Group</option>
                        {groups.map((group) => (
                          <option key={group._id} value={group._id}>
                            {group.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Login Detail:
                      <textarea
                        value={newTestLoginDetail}
                        onChange={(e) => setNewTestLoginDetail(e.target.value)}
                      ></textarea>
                    </label>
                    <button type="submit">Add</button>
                    <button
                      onClick={() => handlePostClose()}
                      style={{ backgroundColor: "red" }}
                      type="button"
                    >
                      Close
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tests;
