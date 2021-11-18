import { useState, useEffect } from "react";

import { useAppSelector } from "../../app/hooks";

const useSubscribeCookingProcess = () => {
  const log = useAppSelector(state => state.settings.latestCookingLog);
  const [status, setStatus] = useState("started");
  const [stage, setStage] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (log?.topic === "smartshef/cooking-process") {
      const payload = JSON.parse(log?.message);
      console.log(payload.stage, payload.step);

      setStatus(payload.status);
      setStage(payload.stage);
      setStep(payload.step);
    }
  }, [log]);

  return { status, stage, step };
};

export default useSubscribeCookingProcess;
