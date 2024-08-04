"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import Footer from "@/app/components/Footer";
import category from "/public/category.json";
import UserInfoTable from "@/app/accounts/components/UserInfoTable";
import { useEffect, useState } from "react";
import Link from "next/link";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
const initialInfo = {
  username: "",
  password: "",
  repeatedPassword: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  languagePreference: "",
  favouriteCategoryId: "",
  listOption: false,
  bannerOption: false,
};

async function updateInfo(newUserInfo) {
  const res = await fetch(`${apiDomain}/my/account/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserInfo),
  });

  if (res.ok) {
    const result = await res.json();
    console.log("update Result:", result);
    return result;
  } else {
    const result = await res.json();
    console.error("Error:", result.error);
    throw new Error(result.error);
  }
}

export default function UpdateUserInfo() {
  const [userInfo, setUserInfo] = useState(initialInfo);

  useEffect(() => {
    async function fetchUserInfo() {
      const thisUser = localStorage.getItem("username");
      const res = await fetch(
        `${apiDomain}/my/account/update?form&username=${thisUser}`
      );
      if (res.ok) {
        const result = await res.json();
        // avoid null value, replace with empty string
        const sanitizedResult = Object.fromEntries(
          Object.entries(result).map(([key, value]) => [key, value ?? ""])
        );

        setUserInfo(sanitizedResult);
        console.log("Get Result:", sanitizedResult);
      } else {
        const result = await res.json();
        console.error("Error:", result.error);
      }
    }
    fetchUserInfo();
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setUserInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // avoid passwaord and repeatedPassword is ""
    const dataToSubmit = { ...userInfo };
    if (dataToSubmit.password === "") {
      dataToSubmit.password = null;
    }
    if (dataToSubmit.repeatedPassword === "") {
      dataToSubmit.repeatedPassword = null;
    }
    console.log("Submit:", dataToSubmit);

    updateInfo(dataToSubmit)
      .then(() => {
        alert("Update Information Successfully.");
      })
      .catch((error) => alert(`Update failed: ${error}`));
  }

  return (
    <div>
      <Header />
      <Content>
        <div id="Catalog">
          <form onSubmit={handleSubmit}>
            <h3>User Information</h3>

            <table>
              <tbody>
                <tr>
                  <td>User ID:</td>
                  <td>
                    <span>{userInfo.username}</span>
                  </td>
                </tr>
                <UserInfoTable
                  title="New password:"
                  type="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                />
                <UserInfoTable
                  title="Repeat password:"
                  type="password"
                  name="repeatedPassword"
                  value={userInfo.repeatedPassword}
                  onChange={handleChange}
                />
              </tbody>
            </table>

            <div>
              <h3>Account Information</h3>

              <table>
                <tbody>
                  <UserInfoTable
                    title="First name:"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleChange}
                  />
                  <UserInfoTable
                    title="Last name:"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleChange}
                  />
                  <UserInfoTable
                    title="Email:"
                    type="email"
                    name="email"
                    size="40"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                  <UserInfoTable
                    title="Phone:"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleChange}
                  />
                  <UserInfoTable
                    title="Address 1:"
                    size="40"
                    name="address1"
                    value={userInfo.address1}
                    onChange={handleChange}
                  />
                  <UserInfoTable
                    title="Address 2:"
                    size="40"
                    name="address2"
                    value={userInfo.address2}
                    onChange={handleChange}
                  />
                  <UserInfoTable
                    title="City:"
                    name="city"
                    value={userInfo.city}
                    onChange={handleChange}
                  />
                  <UserInfoTable
                    title="State:"
                    size="4"
                    name="state"
                    value={userInfo.state}
                    onChange={handleChange}
                  />
                  <UserInfoTable
                    title="Zip:"
                    size="10"
                    name="zip"
                    value={userInfo.zip}
                    onChange={handleChange}
                  />
                  <UserInfoTable
                    title="Country:"
                    size="15"
                    name="country"
                    value={userInfo.country}
                    onChange={handleChange}
                  />
                </tbody>
              </table>

              <h3>Profile Information</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Language Preference:</td>
                    <td>
                      <select
                        name="languagePreference"
                        value={userInfo.languagePreference}
                        onChange={handleChange}
                      >
                        <option value="english" key="english">
                          English
                        </option>
                        <option value="japanese" key="japanese">
                          Japanese
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Favourite Category:</td>
                    <td>
                      <select
                        name="favouriteCategoryId"
                        value={userInfo.favouriteCategoryId}
                        onChange={handleChange}
                      >
                        {category.map((c) => (
                          <option value={c.name} key={c.catid}>
                            {c.catid}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <UserInfoTable
                    title="Enable MyList:"
                    type="checkbox"
                    name="listOption"
                    checked={userInfo.listOption}
                    onChange={handleChange}
                  />
                  <UserInfoTable
                    title="Enable MyBanner:"
                    type="checkbox"
                    name="bannerOption"
                    checked={userInfo.bannerOption}
                    onChange={handleChange}
                  />
                </tbody>
              </table>
            </div>

            <input id="save" type="submit" value="Save Account Information" />
          </form>
          <Link href="/order/userOrders">My Orders</Link>
        </div>
      </Content>
      <Footer />
    </div>
  );
}
