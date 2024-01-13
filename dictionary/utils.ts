import "server-only";
import { type Locale } from "@/dictionary";

const basePath = "./translate";

const dictionaries = (locale: Locale = "fa") =>
	import(`${basePath}/${locale}.json`).then(module => module.default);

export const getDictionary = async (locale: Locale) => dictionaries?.(locale);
