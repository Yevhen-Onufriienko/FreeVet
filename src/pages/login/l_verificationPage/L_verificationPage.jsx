import { useNavigate } from "react-router-dom";
import s from "./l_verificationPage.module.css";
import FormHeader from "../../../components/formHeader/FormHeader";
import useVerificationCode from "../../../customHooks/useVerificationCode";
import CodeInputBox from "../../../components/codeInputBox/CodeInputBox";
import texts from '../../../utils/ru_text';  // Импорт текстов

const L_verificationPage = () => {
  const navigate = useNavigate();
  const {
    control,
    setValue,
    handleSubmit,
    inputRefs,
    isFormValid,
    seconds,
    resendAvailable,
    codeError,
    errorVisible,
    handleInputChange,
    handleKeyDown,
    handleResendCode,
    validateCode,
  } = useVerificationCode();

  const onSubmit = (data) => {
    const code = Object.values(data).join("");
    if (validateCode(code)) {
      navigate("/verification/role");
    }
  };

  return (
    <div className={s.l_verificationPage}>
      <FormHeader path="/register" titleKey={texts.verificationPage.header}/>
      <p className={s.enterCode}
        dangerouslySetInnerHTML={{ __html: texts.verificationPage.enterCode }} 
      />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <CodeInputBox
          control={control}
          setValue={setValue}
          inputRefs={inputRefs}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          errorVisible={errorVisible}
          codeError={codeError}
          resendAvailable={resendAvailable}
          handleResendCode={handleResendCode}
          seconds={seconds}
        />
        <button className={s.button} type="submit" disabled={!isFormValid}>
          {texts.verificationPage.confirm}
        </button>
      </form>
    </div>
  );
};

export default L_verificationPage;
