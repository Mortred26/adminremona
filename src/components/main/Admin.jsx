import React from "react";
import "../style/style.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import Sidebar from "./Sidebar";
import { authStore } from "../store/auth.store";

function Admin() {
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
            <h1>Admins</h1>
          </div>
          <div className="page-content">
            <div className="records table-responsive">
              <div className="record-header">
                <div className="add">
                  <span>Entries</span>
                  <select>
                    <option>ID</option>
                  </select>
                  <button>Add record</button>
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
                      <th>#</th>
                      <th>
                        <span className="las la-sort"></span> CLIENT
                      </th>
                      <th>
                        <span className="las la-sort"></span> TOTAL
                      </th>
                      <th>
                        <span className="las la-sort"></span> ISSUED DATE
                      </th>
                      <th>
                        <span className="las la-sort"></span> BALANCE
                      </th>
                      <th>
                        <span className="las la-sort"></span> ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#5033</td>
                      <td>
                        <div className="client">
                          <div
                            className="client-img bg-img"
                            style={{ backgroundImage: "url(img/3.jpeg)" }}
                          ></div>
                          <div className="client-info">
                            <h4>Andrew Bruno</h4>
                            <small>bruno@crossover.org</small>
                          </div>
                        </div>
                      </td>
                      <td>$3171</td>
                      <td>19 April, 2022</td>
                      <td>-$205</td>
                      <td>
                        <div className="actions">
                          <span className="lab la-telegram-plane"></span>
                          <span className="las la-eye"></span>
                          <span className="las la-ellipsis-v"></span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#5033</td>
                      <td>
                        <div className="client">
                          <div
                            className="client-img bg-img"
                            style={{ backgroundImage: "url(img/1.jpeg)" }}
                          ></div>
                          <div className="client-info">
                            <h4>Exty Bruno</h4>
                            <small>exty@crossover.org</small>
                          </div>
                        </div>
                      </td>
                      <td>$3171</td>
                      <td>19 April, 2022</td>
                      <td>-$205</td>
                      <td>
                        <div className="actions">
                          <span className="lab la-telegram-plane"></span>
                          <span className="las la-eye"></span>
                          <span className="las la-ellipsis-v"></span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#5033</td>
                      <td>
                        <div className="client">
                          <div
                            className="client-img bg-img"
                            style={{ backgroundImage: "url(img/1.jpeg)" }}
                          ></div>
                          <div className="client-info">
                            <h4>Exty Bruno</h4>
                            <small>exty@crossover.org</small>
                          </div>
                        </div>
                      </td>
                      <td>$2171</td>
                      <td>19 April, 2022</td>
                      <td>
                        <span className="paid">Paid</span>
                      </td>
                      <td>
                        <div className="actions">
                          <span className="lab la-telegram-plane"></span>
                          <span className="las la-eye"></span>
                          <span className="las la-ellipsis-v"></span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>#5033</td>
                      <td>
                        <div className="client">
                          <div
                            className="client-img bg-img"
                            style={{ backgroundImage: "url(img/1.jpeg)" }}
                          ></div>
                          <div className="client-info">
                            <h4>Exty Bruno</h4>
                            <small>exty@crossover.org</small>
                          </div>
                        </div>
                      </td>
                      <td>$2171</td>
                      <td>19 April, 2022</td>
                      <td>
                        <span className="unpaid">Unpaid</span>
                      </td>
                      <td>
                        <div className="actions">
                          <span className="lab la-telegram-plane"></span>
                          <span className="las la-eye"></span>
                          <span className="las la-ellipsis-v"></span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
