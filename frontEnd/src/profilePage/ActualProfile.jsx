import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/auth";
import axiosInstance from "../util/axiosIntance";
import ProfilePageCard from "./Card";
export default function ProfilePage() {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [image, setImage] = useState("");
  const [request, setRequest] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance.get(
        "http://localhost:9000/api/v1/user/profile-page"
      );
      const { name, image, phoneNo, rollNo, branch, requests, mailId } =
        response.data.data.user;
      const { token } = response.data.data;
      authCtx.login({ name, token, mailId });
      setName(name);
      setImage(image);
      setPhoneNo(phoneNo);
      setRollNo(rollNo);
      setBranch(branch);
      setRequest(requests);
    };
    getUser();
  }, []);

  const { user } = authCtx;
  console.log(user);
  if (!user) return <Navigate to="/" />;
  if (user.isAdmin) return <Navigate to="/Admin/requests" />;

  return (
    <ProfilePageCard
      name={name}
      Branch={branch}
      phoneNumber={phoneNo}
      rollNumber={rollNo}
      image={image}
      requests={request}
    />
  );
}
