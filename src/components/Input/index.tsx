import { forwardRef, InputHTMLAttributes } from "react"
import { InputStyleContainer, InputWrapper } from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props } , ref) => {
    return (
      <div className="inputContainer">
      <InputWrapper className="first-input" >
        <InputStyleContainer className={`${className} first-input`} {...props} ref={ref} />
      </InputWrapper>
      <span className="errorMsg" style={{ userSelect: "none" }}>{error}</span>
      </div>
    )
  }
)