"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import Footer from "@/app/components/Footer";
import category from "/public/category.json";
import UserInfoTable from "@/app/accounts/components/UserInfoTable";
import { exportDbtoPublic } from "@/app/function/exportDbtoPublic";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

async function signup(signupData) {
  const res = await fetch(`${apiDomain}/accounts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  });

  if (res.ok) {
    const result = await res.json();
    console.log("Result:", result);
    return result;
  } else {
    const result = await res.json();
    console.error("Error:", result);

    if (result.length >= 1) {
      let formatErr = "";
      result.map((r) => {
        formatErr += r.text + "\n";
      });
      throw new Error(formatErr);
    } else {
      throw new Error(result.error);
    }
  }
}

export default function CreateUserInfo() {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.listOption === "on"
      ? (data.listOption = true)
      : (data.listOption = false);
    data.bannerOption === "on"
      ? (data.bannerOption = true)
      : (data.bannerOption = false);
    console.log("Data:", data);

    signup(data)
      .then(() => {
        alert("Account created successfully.");
        exportDbtoPublic()
          .then((msg) => console.log(msg))
          .catch((error) => console.error(error));
        setTimeout(() => {
          location.href = "/login";
        }, 1000);
      })
      .catch((error) => {
        alert(`Failed to create account: ${error}`);
      });
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
                <UserInfoTable title="User ID:" name="username" />
                <UserInfoTable
                  title="New password:"
                  type="password"
                  name="password"
                />
                <UserInfoTable
                  title="Repeat password:"
                  type="password"
                  name="repeatedPassword"
                />
              </tbody>
            </table>

            <div>
              <h3>Account Information</h3>

              <table>
                <tbody>
                  <UserInfoTable title="First name:" name="firstName" />
                  <UserInfoTable title="Last name:" name="lastName" />
                  <UserInfoTable
                    title="Email:"
                    type="email"
                    size="40"
                    name="email"
                  />
                  <UserInfoTable title="Phone:" name="phone" />
                  <UserInfoTable title="Address 1:" size="40" name="address1" />
                  <UserInfoTable title="Address 2:" size="40" name="address2" />
                  <UserInfoTable title="City:" name="city" />
                  <UserInfoTable title="State:" size="4" name="state" />
                  <UserInfoTable title="Zip:" size="10" name="zip" />
                  <UserInfoTable title="Country:" size="15" name="country" />
                </tbody>
              </table>

              <h3>Profile Information</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Language Preference:</td>
                    <td>
                      <select name="languagePreference">
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
                      <select name="favouriteCategoryId">
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
                  />
                  <UserInfoTable
                    title="Enable MyBanner:"
                    type="checkbox"
                    name="bannerOption"
                  />
                </tbody>
              </table>
            </div>

            <input id="save" type="submit" value="Save Account Information" />
          </form>
        </div>
      </Content>
      <Footer />
    </div>
  );
}
