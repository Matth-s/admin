import "./style.scss";

type Props = {
  errorText: string;
};

const ErrorInput = ({ errorText }: Props) => {
  return <p className="errorText">{errorText}</p>;
};

export default ErrorInput;
