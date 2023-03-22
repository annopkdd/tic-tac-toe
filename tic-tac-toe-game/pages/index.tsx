import React from "react";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { appStoreContext } from "@/RootStore";
import { IAppModel } from "@/modules/AppModel";
import { Button, Image } from "@/components/common";
import { FullScreenLayout } from "@/components/layouts";
import { Icons } from "@/constants";
import { gameAPI } from "@/modules/game/service";

type IGameLog = {
  id: number;
  game_date: string;
  game_status: string;
  game_duration: number;
};

type IGameStatistic = {
  drawPercent: number;
  xWinPercent: number;
  oWinPercent: number;
  quitPercent: number;
};

const Marker = (props: { selected?: string; onClick?: () => void }) => {
  return (
    <div
      className="border-gray-900 border-2 rounded-full bg-lime-400 w-[50px] h-[50px] flex justify-center items-center cursor-pointer m-2"
      onClick={props.onClick}
    >
      {props.selected === "X" ? (
        <Image src={Icons.closeIcon} width={35} height={35} />
      ) : null}
      {props.selected === "O" ? (
        <div className="bg-black w-[22px] h-[22px] rounded-sm" />
      ) : null}
    </div>
  );
};

const Index = () => {
  const appStore: IAppModel = React.useContext(appStoreContext);

  const [selectedArray, setSelectedArray] = React.useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [turn, setTurn] = React.useState<"X" | "O">("X");
  const [isReadyToPlay, setIsReadyToPlay] = React.useState(false);
  const [gameStatus, setGameStatus] = React.useState<
    "X" | "O" | "DRAW" | "QUIT" | ""
  >("");

  const [durationInterval, setDurationInterval] = React.useState<any>(null);
  const [duration, setDuration] = React.useState(0);

  const [gameLogs, setGameLogs] = React.useState<IGameLog[]>([]);
  const [gameStatistic, setGameStatistic] =
    React.useState<IGameStatistic | null>(null);

  React.useEffect(() => {
    (async () => {
      getGameDetails();
    })();
  }, []);

  React.useEffect(() => {
    if (isReadyToPlay) {
      setDurationInterval(
        setInterval(() => {
          setDuration((duration) => duration + 1);
        }, 1000)
      );
    } else {
      clearInterval(durationInterval);
      setDuration(0);
    }
  }, [isReadyToPlay]);

  React.useEffect(() => {
    const calWinner = calculateWinner();
    if (calWinner) {
      // @ts-ignore
      setGameStatus(calWinner);
      setIsReadyToPlay(false);
      onAddGameLog(calWinner);
    }
  }, [selectedArray]);

  const onSelectedMarker = (index: number) => {
    if (isReadyToPlay && !selectedArray[index]) {
      const arr = [...selectedArray];
      arr[index] = turn;
      setSelectedArray(arr);
      setTurn(turn === "O" ? "X" : "O");
    }
  };

  const onClickStartButton = () => {
    setIsReadyToPlay(!isReadyToPlay);
    if (isReadyToPlay) {
      setGameStatus("QUIT");
      onAddGameLog("QUIT");
    }
    setSelectedArray(selectedArray.map(() => ""));
  };

  function calculateWinner() {
    if (selectedArray.filter((v) => v !== "").length === 9) {
      return "DRAW";
    }

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        selectedArray[a] &&
        selectedArray[a] === selectedArray[b] &&
        selectedArray[a] === selectedArray[c]
      ) {
        return selectedArray[a];
      }
    }
    return null;
  }

  const getGameDetails = async () => {
    try {
      const [gameLogsResult, gameStatisticResult] = await Promise.all([
        gameAPI.getGameLogs(),
        gameAPI.getStatistics(),
      ]);
      setGameLogs(gameLogsResult.list);
      setGameStatistic(gameStatisticResult);
    } catch (e) {
      console.log("");
    } finally {
    }
  };

  const onAddGameLog = async (gameStatusValue: string) => {
    try {
      await gameAPI.addGameLog({
        game_date: dayjs().format("DD/MM/YYYY HH:mm"),
        game_duration: duration,
        game_status: gameStatusValue,
      });
      getGameDetails();
    } catch (e) {
      console.log("");
    } finally {
    }
  };

  let resultStatus = "";

  if (gameStatus === "DRAW") {
    resultStatus = `Draw! The game is over`;
  } else if (gameStatus === "O" || gameStatus === "X") {
    resultStatus = `${gameStatus} won! The game is over`;
  }

  return (
    <div className="h-full overflow-hidden flex flex-col items-center">
      <div className="flex flex-row self-stretch">
        <div className="flex-[1] flex flex-col items-center">
          <div className="mt-5">
            <span className="font-ibm-semibold">TIC TAC TOE Game</span>
          </div>
          <div className="mt-4 flex flex-row justify-space-between items-center">
            <Button
              title={isReadyToPlay ? "Quit" : "New"}
              onClick={onClickStartButton}
            />
            <span className="font-ibm-semibold ml-6">{duration}</span>
          </div>
          <div className="grid grid-cols-3 mt-4 p-5 rounded-lg bg-slate-400">
            {selectedArray.map((val, index) => (
              <Marker
                key={`_marker_${index}`}
                selected={selectedArray[index]}
                onClick={() => onSelectedMarker(index)}
              />
            ))}
          </div>
          <div className="mt-4">
            <span className="font-ibm-semibold">{resultStatus}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-center pt-6">
            <span className="font-ibm-semibold">Passed Games</span>
            <div className="h-[400px] overflow-y-auto">
              <table className="text-left">
                <thead>
                  <tr>
                    <th>Game Id</th>
                    <th>Game Date</th>
                    <th>Game Status</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {gameLogs.map((gameLog: IGameLog, index: number) => (
                    <tr key={`_gamelog_${index}`}>
                      <td>{gameLog.id}</td>
                      <td>{gameLog.game_date}</td>
                      <td>{gameLog.game_status}</td>
                      <td>{gameLog.game_duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center pt-6">
            <span className="font-ibm-semibold">Statistics</span>
            <table className="text-left">
              <thead>
                <tr>
                  <th>XWInPercent</th>
                  <th>OWinPercent</th>
                  <th>QuitPercent</th>
                  <th>DrawPercent</th>
                </tr>
              </thead>
              {gameStatistic ? (
                <tbody>
                  <tr>
                    <td>{`${gameStatistic.xWinPercent}%`}</td>
                    <td>{`${gameStatistic.oWinPercent}%`}</td>
                    <td>{`${gameStatistic.quitPercent}%`}</td>
                    <td>{`${gameStatistic.drawPercent}%`}</td>
                  </tr>
                </tbody>
              ) : null}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.Layout = FullScreenLayout;

export default observer(Index);
