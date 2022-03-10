import React, {useEffect, useState} from "react";
import axiosInstance from "../util/axiosIntance";
import ProfilePageCard from "./Card";
export default function ProfilePage() {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [image, setImage] = useState("");
  const [request, setRequest] = useState(['1', '2', '3', '4', '5']);

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance.get(
        "http://localhost:9000/api/v1/user/profile-page"
      );
      const {name, image, phoneNo, rollNo, branch, requests} =
        response.data.data.user;
      setName(name);
      setImage(image);
      setPhoneNo(phoneNo);
      setRollNo(rollNo);
      setBranch(branch);
      setRequest(requests);
      console.log(requests);
    };
    getUser();
  }, []);

  return (
    <ProfilePageCard/>
  );
}

