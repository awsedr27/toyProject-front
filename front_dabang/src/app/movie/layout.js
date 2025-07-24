import { CustomBox } from "@/styles/CommonStyles";
import Header from "../components/layouts/Header";

export default function movieLayout({ children }) {
  return (
    <>
        <Header></Header>
        <CustomBox sx={{width:'90%'}}>
            {children}
        </CustomBox>
    </>
  );
}