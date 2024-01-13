import React from "react";
import { type Locale } from "@/dictionary";
import { getDictionary } from "@/dictionary/utils";

const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const { welcome } = await getDictionary(lang);

	return <React.Fragment>{welcome}</React.Fragment>;
};

export default Home;
