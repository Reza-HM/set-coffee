import React, { FC, useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import { validateEmail, validatePassword } from "@/utils/auth";
import { useRouter } from "next/navigation";

type LoginProps = {
  showRegisterForm: () => void;
};

const Login: FC<LoginProps> = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const router = useRouter();

  const hideOtpForm = () => setIsLoginWithOtp(false);

  const loginWithPassword = async () => {
    console.log(phoneOrEmail);
    if (!phoneOrEmail) {
      return showSwal("لطفا شماره تماس یا ایمیل را وارد کنید", "error", [
        "چشم",
        "بستن",
      ]);
    }

    const isValidEmail = validateEmail(phoneOrEmail);
    if (!isValidEmail) {
      return showSwal("ایمیل وارد شده صحیح نیست", "error", [
        "تلاش مجدد",
        "بستن",
      ]);
    }

    if (!password) {
      return showSwal("پسورد را وارد کنید", "error", ["تلاش مجدد", "بستن"]);
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return showSwal("پسورد به اندازه کافی قوی نیست", "error", [
        "تلاش مجدد",
        "بستن",
      ]);
    }

    const user = { email: phoneOrEmail, password };

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    console.log("Res ->", res);
    if (res.status === 200) {
      showSwal("با موفقیت لاگین شدین", "success", [
        "ورود به پنل کاربری",
        "بستن",
      ]);
      router.push("/");
    } else if (res.status === 422 || res.status === 401) {
      showSwal("کاربری با این اطلاعات یافت نشد", "error", [
        "تلاش مجدد",
        "بستن",
      ]);
    } else if (res.status === 419) {
      showSwal("ایمیل یا پسورد صحیح نیست", "error", ["تلاش مجدد", "بستن"]);
    }
  };

  return (
    <>
      {!isLoginWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="ایمیل/شماره موبایل"
              value={phoneOrEmail}
              onChange={(event) => setPhoneOrEmail(event.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button className={styles.btn} onClick={loginWithPassword}>
              ورود
            </button>
            <Link href={"/forget-password"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              className={styles.btn}
              onClick={() => setIsLoginWithOtp(true)}
            >
              ورود با کد یکبار مصرف
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button className={styles.btn_light} onClick={showRegisterForm}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Login;
