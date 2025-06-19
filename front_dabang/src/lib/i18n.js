import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import multilang from "@/message/multilang.json";


// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = multilang;



export const setupI18n = (initialState = {}) => {
    // 이미 초기화된 경우, 언어 변경 및 리소스 추가만 수행
    if (i18n.isInitialized) {
        if (initialState.lng && initialState.lng !== i18n.language) {
            i18n.changeLanguage(initialState.lng);
        }
        if (initialState.resources) {
            Object.keys(initialState.resources).forEach(lng => {
                Object.keys(initialState.resources[lng]).forEach(ns => {
                    i18n.addResourceBundle(lng, ns, initialState.resources[lng][ns], true, true);
                });
            });
        }
        // 이미 초기화되었으므로, 즉시 해결되는 Promise 반환
        i18n.initPromise = Promise.resolve(i18n);
        return i18n;
    }

    // i18n 인스턴스 초기화 Promise를 저장
    const initPromise =
        i18n
            .use(initReactI18next) // passes i18n down to react-i18next
            .init({
                resources,
                lng: "kr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
                // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
                // if you're using a language detector, do not define the lng option

                interpolation: {
                    escapeValue: false // react already safes from xss
                }
            });

    i18n.initPromise = initPromise; // 초기화 Promise를 i18n 인스턴스에 추가
    return i18n;
};

// 클라이언트에서 초기 로딩 시 사용할 기본 인스턴스 (setupI18n이 실행되기 전)
// 실제 앱에서는 I18nProvider를 통해 setupI18n이 호출되므로 큰 의미는 없을 수 있음
const defaultI18nInstance = setupI18n();
export default i18n;