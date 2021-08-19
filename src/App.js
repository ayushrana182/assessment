import "./App.css";
import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Subscriptions from "./components/Subcriptions";

function App() {
  const [users, setUsers] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  const searchQuery = filter.toLowerCase();
  const [options, setOptions] = React.useState([]);
  const [select, setSelect] = React.useState("");

  const handleSelect = (e) => {
    setSelect(e.value);
  };

  React.useEffect(() => {
    fetch("https://ayushrana182.github.io/assessment/users.json")
      .then((resp) => resp.json())
      .then((u) => {
        fetch("https://ayushrana182.github.io/assessment/subscriptions.json")
          .then((resp) => resp.json())
          .then((s) => {
            setOptions([
              "No Plan",
              ...Object.keys(
                s.reduce(
                  (a, v) => ({
                    ...a,
                    [v.package]: true,
                  }),
                  {}
                )
              ),
            ]);
            const planMap = s.reduce(
              (a, v) => ({
                ...a,
                [v.user_id]: v.package,
              }),
              {}
            );
            const um = u.map((cu) => ({
              ...cu,
              plan: planMap[cu.id] || "No Plan",
            }));
            console.log(um.filter((u1) => u1.plan.length > 0).length);

            setUsers(um);
          });
      });
  }, []);

  return (
    <div className="App">
      <h1>User and Subcriptions Dashboard</h1>
      <div style = {{marginBottom:"15px", width:"101%"}}>

      <Dropdown
        placeholder="Select a Package"
        options={options}
        value={select}
        onChange={handleSelect}
      />
      </div>
      <div>
      <input
        type="text"
        name="Search"
        className="form"
        placeholder="Search"
        value={filter}
        onChange={(evt) => setFilter(evt.target.value)}
      />
      </div>

      {users
        .filter(
          (user) =>
            user.first_name.toLowerCase().includes(searchQuery) ||
            user.last_name.toLowerCase().includes(searchQuery)
        )
        .filter((user) => user.plan === select)
    
        .map((u) => (
          <div className="card" key={u.id}>
            <div>
              First Name:{" "}
              <span style={{ background: "#DCDCDC" }}>{u.first_name}</span>
            </div>
            <div>
              Last Name:{" "}
              <span style={{ background: "#DCDCDC" }}>{u.last_name}</span>{" "}
            </div>
            <div>
              Country:{" "}
              <span style={{ background: "#DCDCDC" }}>{u.country}</span>{" "}
            </div>
            <Subscriptions user={u} select={select} />
          </div>
        ))}
    </div>
  );
}

export default App;
