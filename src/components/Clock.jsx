import React from "react";

const Clock = (props) => {
  const [hour, setHour] = React.useState("00");
  const [minute, setMinute] = React.useState("0");
  const [mainSize, setMainSize] = React.useState(8);
  const [secondSize, setSecondSize] = React.useState(1.875);
  const [second, setSecond] = React.useState("");
  React.useLayoutEffect(() => {
    let timeoutId;
    const updateTime = () => {
      let currentTime = new Date();
      setHour(currentTime.getHours());
      setMinute(currentTime.getMinutes());
      setSecond(currentTime.getSeconds());
      // Account for setTimeout drift so seconds don't skip occasionally
      timeoutId = setTimeout(() => updateTime(), 1000 - currentTime.getMilliseconds());
    }
    updateTime();
    return () => clearTimeout(timeoutId);
  }, []);

  React.useLayoutEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 1370) {
        setMainSize(4.5);
        setSecondSize(1.75);
      } else {
        setMainSize(8);
        setSecondSize(1.875);
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <p
      className={`p-8 leading-none absolute opacity-80 overflow-visible`}
      style={{
        fontSize: `${mainSize * props.textSize}rem`,
        top: "79vh",
        right: "2vw",
        color: `white`,
        textShadow: (() => {
          const v = props.textShadow;
          if (!v) return "3px 3px 0 rgba(0, 0, 0, 0.5)";
          const tokens = String(v).trim().split(/\s+/);
          const hasOffset = tokens.some((t) => /\d+px/.test(t));
          return hasOffset ? v : `3px 3px 0 ${v}`;
        })(),
      }}
    >
      {(props.use24HourClock ? hour : (hour === 0 || hour === 12 ? "12" : hour % 12)) + ":"}
      {minute.toString().padStart(2, "0")}
      <span
        className={`absolute bottom-[2.5vh]`}
        style={{
          fontSize: `${secondSize * props.textSize}rem`,
          color: `white`,
        }}
      >
        {props.showSeconds ? second.toString().padStart(2, "0") : ""}
      </span>
      <span
        className={`absolute top-[5vh]`}
        style={{
          fontSize: `${secondSize * props.textSize}rem`,
          color: `white`,
        }}
      >
        {props.use24HourClock ? "" : (hour < 12 ? "AM" : "PM")}
      </span>
    </p>
  );
};

export default Clock;
