import React, { useState, useRef, useEffect } from "react";

const Time = ({ deadline }) => {
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("");

  const getTimeRemaining = (e) => {
    let total = Math.floor((Date.parse(e) - Date.parse(new Date())) / 1000);
    const days = Math.floor(total / (60 * 60 * 24));
    total -= days * 60 * 60 * 24;
    const hours = Math.floor(total / (60 * 60));
    total -= hours * 60 * 60;
    const minutes = Math.floor(total / 60);
    total -= minutes * 60;
    const seconds = total;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { days, hours, minutes, seconds } = getTimeRemaining(e);
    if (true) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the begining of the variable
      setTimer(
        days +
          " days " +
          hours +
          " hours " +
          minutes +
          " minutes " +
          seconds +
          " seconds"

        // (days > 9 ? days : '0' + days) + ' Days, ' +
        // (hours > 9 ? hours : '0' + hours) + ':' +
        // (minutes > 9 ? minutes : '0' + minutes) + ':'
        // + (seconds > 9 ? seconds : '0' + seconds)
      );
    }
  };

  useEffect(() => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(deadline);
    }, 1000);
    Ref.current = id;
  }, []);

  return (
    <div>
      <h2 style={{ color: "#FF0000" }}>{timer}</h2>
    </div>
  );
};

export default Time;
