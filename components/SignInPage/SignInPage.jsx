import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import styles from "./SignInPage.module.css";
import { useTranslation } from "next-i18next";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import NavigationGroup from "../NavigationGroup/NavigationGroup";

export default function SignInPage({ providers, csrfToken }) {
  const { t } = useTranslation("signin");
  const [passkeyOverlay, setPasskeyOverlay] = useState(false);
  const [inputEmailValue, setInputEmailValue] = useState('')
  const [inputUsernameValue, setInputUsernameValue] = useState('')

  const paths = {
    fullPath: "/signin",
    pathNamesEn: [
      "Sign In",
    ],
    pathNamesVi: [
      "Đăng Nhập",
    ],
  }

  const handleEmailChange = (event) => {
    setInputEmailValue(event.target.value); // Update the state with the input's value
  }

  const handleUsernameChange = (event) => {
    setInputUsernameValue(event.target.value); // Update the state with the input's value
  }

  const handleClearForm = () => {
    setInputEmailValue('');
    setInputUsernameValue('');
  }

  function togglePasskeyOverlay() {
    setPasskeyOverlay(!passkeyOverlay);
  }

  return (
    <div className={styles.signin_layout}>
      <h2>{t("title")}</h2>
      <LanguageSelector />
      <NavigationGroup paths={paths} />
      {/* <div>
        <button
          className={styles.webauthn_signin_button}
          // onClick={() => signIn("webauthn", { username: "demo" })}
          onClick={togglePasskeyOverlay}
        >
          <Image
            src="/icons8-face-id.svg"
            alt="FaceID Logo"
            width={50}
            height={50}
          />
          <span className={styles.button_text}>{t("method1")}</span>
        </button>
        {
          passkeyOverlay ? 
            <div className={styles.passkey_overlay}>
              <div className={styles.passkey_form}>
                <div className={styles.passkey_header}>
                  <div className={styles.passkey_form_control}>  
                    <button
                      className={styles.close_button} 
                      onClick={togglePasskeyOverlay}
                    >
                      Close
                    </button>
                    <button
                      className={styles.clear_button} 
                      onClick={handleClearForm}
                    >
                      Clear
                    </button>
                  </div>
                  <div className={styles.passkey_title}>Enter your email and username</div>
                </div>

                <div className={styles.passkey_input_container}>
                  <input 
                    className={styles.passkey_input} 
                    type="email" 
                    placeholder="Email" 
                    value={inputEmailValue}
                    onChange={handleEmailChange}
                    required
                    />
                  <input 
                    className={styles.passkey_input} 
                    type="text" 
                    placeholder="Username"
                    value={inputUsernameValue}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <button
                  className={styles.submit_button}
                >
                  <Image
                    src="/icons8-face-id.svg"
                    alt="FaceID Logo"
                    width={25}
                    height={25}
                  />
                  Sign In
                </button>
              </div>
            </div> 
          : null
        }
      </div>
      <div className={styles.separator}>
        <span className={styles.separatorText}>{t("separator")}</span>
      </div> */}
      <div>
        <button
          className={styles.google_signin_button}
          onClick={() => signIn("google")}
        >
          <Image
            src="/icons8-google.svg"
            alt="Google Logo"
            width={50}
            height={50}
          />
          <span className={styles.button_text}>{t("method2")}</span>
        </button>
      </div>
      <div>
        <button
          className={styles.github_signin_button}
          onClick={() => signIn("github")}
        >
          <Image
            src="/icons8-github.svg"
            alt="Google Logo"
            width={50}
            height={50}
          />
          <span className={styles.button_text}>{t("method3")}</span>
        </button>
      </div>
    </div>
  );
}
