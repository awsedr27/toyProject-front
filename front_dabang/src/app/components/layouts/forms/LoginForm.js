import BtnLogin from "../../buttons/BtnLogin";
import BtnSingUp from "../../buttons/BtnSignUp";

export default function LoginForm() {
    return (
        <div className="login-container">
      <h1>로그인</h1>
      <form className="login-form">
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" required autoFocus />

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password" required />

        <BtnLogin></BtnLogin>
      </form>
      <p>
        아직 계정이 없으신가요? <BtnSingUp></BtnSingUp>
      </p>
    </div>
    );
}