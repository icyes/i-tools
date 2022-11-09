import "../index.css";
import classnames from "classnames";
export default (props) => {
  return (
    <div className={classnames({ hidden: !props.show }, "w-full h-full")}>
      <canvas id={"canvas"} className={classnames("w-full h-full")}></canvas>
    </div>
  );
};
