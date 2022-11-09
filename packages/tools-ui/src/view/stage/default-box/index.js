import "../index.css";
import classnames from "classnames";
export default (props) => {
  return (
    <div
      className={classnames(
        { hidden: !props.show },
        "w-full h-full flex items-center justify-center"
      )}
    >
      Hello word
    </div>
  );
};
