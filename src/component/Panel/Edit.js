import axios from "axios";
import { NormalInput } from "component/common/NormalInput";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./style.scss";

export const Edit = () => {
  const [addUser, setAddUser] = useState({
    name: "",
    username: "",
    website: "",
    phone: "",
  });

  const history = useHistory();

  const { id } = useParams();

  //handle Change
  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target || e || {};
    setAddUser({ ...addUser, [name]: value });
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const res = await axios.get(`http://localhost:3003/users/${id}`);
    setAddUser(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/users/${id}`, addUser).then(() => {
      history.push("/dashboard/view");
    });
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-center align-items-center addUser-BoxContainer-layout">
          <div>
            <div className="addUser-BoxContainer pt-5 pb-4 px-5">
              <div className="addUser-title-box">
                <h3 className="text-danger add-title fs-32 fw-800  text-center p-3">
                  Edit User{" "}
                </h3>
              </div>
              <form className="my-4">
                <div className="form-group my-2">
                  <NormalInput
                    type="text"
                    label="First Name"
                    name="name"
                    value={addUser.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group my-2">
                  <NormalInput
                    type="text"
                    label="Username"
                    name="username"
                    value={addUser.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group my-2">
                  <NormalInput
                    type="text"
                    label="Website"
                    name="website"
                    value={addUser.website}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group my-2">
                  <NormalInput
                    type="text"
                    label="Phone Number"
                    name="phone"
                    value={addUser.phone}
                    onChange={handleChange}
                  />
                  <div className="col-12">
                    <button
                      onClick={handleSubmit}
                      className="addUserBtn fs-22 fw-700 mt-4 mx-auto d-block p-3 px-5"
                    >
                      Update User
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
