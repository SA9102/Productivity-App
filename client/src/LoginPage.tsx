import "./styles/LoginPage.css";

type props = {
  onBackToMain: () => void;
};

const LoginPage = ({ onBackToMain }: props) => {
  return (
    <div>
      <button className="btn-back" onClick={onBackToMain}>
        Back
      </button>
      <p>Username</p>
      <input className="input" type="text" />
      <p>Password</p>
      <input className="input" type="password" name="" id="" />
    </div>
  );
};

export default LoginPage;
