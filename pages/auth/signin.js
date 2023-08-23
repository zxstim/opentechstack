import { getProviders, getCsrfToken, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "../../components/Header/Header";
import SignInPage from "../../components/SignInPage/SignInPage";

export default function SignIn({ providers, csrfToken }) {

	const headerContent = {
		title: "Sign in - OpenTechStack.com",
		description: "Sign in to access premium services from OpenTechStack",
		icon: "../opentechstack.svg",
		domain: "https://www.OpenTechStack.com",
		image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/a6d25640-36ed-4985-a8bd-0f8e1c170b00/defi",
	};

  return (
		<>
			<Header content={headerContent} />
			<SignInPage providers={providers} csrfToken={csrfToken} />
		</>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { 
			redirect: { 
				destination: "/dashboard" 
			} 
		};
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  
  return {
    props: { 
        providers: providers,
        csrfToken: csrfToken,
				...(await serverSideTranslations(context.locale, ["common", "signin"])) 
    },
  }
}