import { useState, useEffect } from "react";

import { useAppSelector } from "../../app/hooks";

const useSubscribeCookingProcess = () => {
  const log = useAppSelector(state => state.settings.latestLog);
  const [status, setStatus] = useState("started");
  const [stage, setStage] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (log?.topic === "smartshef/cooking-process") {
      const payload = JSON.parse(log?.message);
      setStatus(payload.status);
      setStage(payload.stage);
      setStep(payload.step);
    }
  }, [log]);

  return { status, stage, step };
};

export default useSubscribeCookingProcess;
