"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import Footer from "@/app/components/Footer";
import Link from "next/link";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

export default function Login() {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("Data:", data);

    const res = await fetch(`${apiDomain}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    });

    if (res.ok) {
      alert("Login successful");
      setTimeout(() => {
        location.href = "/catalog";
      }, 1000);
    } else {
      const result = await res.json();
      console.error("Error:", result);
      alert(`Login failed: ${result.error}`);
    }
  }

  return (
    <div>
      <Header />
      <Content>
        <div id="Catalog">
          <form onSubmit={handleSubmit}>
            <p>Please enter your username and password.</p>
            <p>
              Username:
              <input type="text" name="username" /> <br />
              Password:
              <input type="password" name="password" />
            </p>
            <input id="login" type="submit" value="Login" />
          </form>
          <p>
            Need a user name and password?
            <Link href="/accounts/createForm">Register Now!</Link>
          </p>
        </div>
      </Content>
      <Footer />
    </div>
  );
}
