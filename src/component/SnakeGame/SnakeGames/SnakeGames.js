import { NormalButton } from "component/common/NormalButton";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdNavigateNext } from "react-icons/md";
import Food from "../Foods/Food";
import Snakes from "../Snakes/Snakes";
import "./style.scss";

export const SnakeGames = () => {
  const getCoord = () => {
    let min = 1;
    let max = 50;
    let x = Math.floor((Math.random() * (max - min + 1)) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1)) / 2) * 2;
    return [x, y];
  };

  const [snakeSpot, setSnakeSpot] = useState([
    [0, 0],
    [0, 2],
    [0, 4],
    [0, 6],
  ]);

  const [foodSpot, setFoodSpot] = useState(getCoord());

  const [direction, setDirection] = useState("RIGHT");

  const [allow, setAllow] = useState(false);

  const [score, setScore] = useState(0);

  const [range, setRange] = useState(500);

  const gameAlert = () => toast("Game Over!");

  useEffect(() => {
    document.onkeydown = snakeController;
    checkFoodHandler();
    borderHandler();
    const start = setInterval(() => {
      moveSnakeHandler(allow);
    }, range);
    return () => clearInterval(start);
  });

  const snakeController = (e) => {
    switch (e.keyCode) {
      case 38:
        setDirection("TOP");
        break;
      case 40:
        setDirection("BOTTOM");
        break;
      case 37:
        setDirection("LEFT");
        break;
      case 39:
        setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  const moveSnakeHandler = (status) => {
    if (status === true) {
      let snakeSpotCopy = [...snakeSpot];
      let snakeSpotMap = snakeSpotCopy[snakeSpotCopy.length - 1];
      switch (direction) {
        case "RIGHT":
          snakeSpotMap = [snakeSpotMap[0], snakeSpotMap[1] + 2];
          break;
        case "LEFT":
          snakeSpotMap = [snakeSpotMap[0], snakeSpotMap[1] - 2];
          break;
        case "TOP":
          snakeSpotMap = [snakeSpotMap[0] - 2, snakeSpotMap[1]];
          break;
        case "BOTTOM":
          snakeSpotMap = [snakeSpotMap[0] + 2, snakeSpotMap[1]];
          break;
        default:
          break;
      }
      snakeSpotCopy.push(snakeSpotMap);
      snakeSpotCopy.shift();
      setSnakeSpot(snakeSpotCopy);
    }
  };

  const rangeHandler = () => {
    if (range > 10) {
      setRange(range - 10);
    }
  };

  const expandSnakeHandler = () => {
    setSnakeSpot([...snakeSpot, snakeSpot[snakeSpot.length - 1]]);
  };

  const checkFoodHandler = () => {
    let snakeSpotMap = snakeSpot[snakeSpot.length - 1];
    let foodSpotMap = foodSpot;
    if (
      snakeSpotMap[0] === foodSpotMap[0] &&
      snakeSpotMap[1] === foodSpotMap[1]
    ) {
      setFoodSpot(getCoord());
      expandSnakeHandler();
      setScore((res) => res + 10);
      rangeHandler();
      localStorage.setItem("score", score);
    }
  };

  const borderHandler = () => {
    let snakeSpotMap = snakeSpot[snakeSpot.length - 1];
    if (
      snakeSpotMap[0] >= 93 ||
      snakeSpotMap[1] >= 93 ||
      snakeSpotMap[0] < 0 ||
      snakeSpotMap[1] < 0
    ) {
      setAllow(false);
      gameAlert();
    }
  };

  // useEffect(() =>{
  //     let container = document.getElementById ("flow");
  // let message = "The width of the contents with padding: " + container.scrollWidth + "px.\n";
  // message += "The height of the contents with padding: " + container.scrollHeight + "px.\n";

  // console.log(message,'skks')
  // })

  let myScore = localStorage.getItem("score");

  return (
    <div>
        <Toaster />
      {allow ? (
        <div>
          <Snakes snakeDots={snakeSpot} />
          <Food foodDot={foodSpot} />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div>
            <NormalButton
              label="start"
              className="btn btn-warning text-uppercase p-3 text-light px-5"
              onClick={() => setAllow(true)}
            />
            <p className="text-light fs-30 fw-800 pt-3">
              <MdNavigateNext className="text-warning" /> Your score is:{" "}
              {myScore}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
