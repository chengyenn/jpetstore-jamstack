"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

async function loginCheck(data) {
  const res = await fetch(`${apiDomain}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  });

  if (res.ok) {
    const result = await res.json();
    console.log("Result:", result);
    return result;
  } else {
    const result = await res.json();
    console.error("Error:", result);
    throw new Error(result.error);
  }
}

export default function Login() {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("Data:", data);

    loginCheck(data)
      .then((result) => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.username);
        router.push("/catalog");
      })
      .catch((error) => {
        alert(`Login failed: ${error}`);
      });
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
