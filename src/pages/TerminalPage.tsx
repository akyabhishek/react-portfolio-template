import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InteractiveTerminal, {
  InteractiveTerminalHandle,
} from "@/components/InteractiveTerminal";

const TerminalPage = () => {
  const terminalRef = useRef<InteractiveTerminalHandle>(null);
  const navigate = useNavigate();

  useEffect(() => {
    terminalRef.current?.openFullscreen();
  }, []);

  return (
    <InteractiveTerminal
      ref={terminalRef}
      hideInline
      onExit={() => navigate(-1)}
    />
  );
};

export default TerminalPage;
