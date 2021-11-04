import { useState, useEffect } from "react";

import useMQTTClient from "./useMQTTClient";

const useSubscribeCookingProcess = () => {
  const [status, setStatus] = useState("started");
  const [stage, setStage] = useState(0);
  const [step, setStep] = useState(0);

  const client = useMQTTClient();

  useEffect(() => {
    client?.subscribe("smartshef/cooking-process", 1);
    client?.on("message", msg => {
      if (msg.topic === "smartshef/cooking-process") {
        const payload = JSON.parse(msg.data);
        setStatus(payload.status);
        setStage(payload.stage);
        setStep(payload.step);
      }
    });
    return () => {
      client?.unsubscribe("smartshef/cooking-process");
    };
  }, [client]);

  return { status, stage, step };
};

export default useSubscribeCookingProcess;
