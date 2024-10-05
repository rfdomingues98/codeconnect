import type { ITerminalAddon } from "@xterm/xterm";
import { memo, useEffect, useState } from "react";
import { ClipboardAddon } from "@xterm/addon-clipboard";
import { FitAddon } from "@xterm/addon-fit";
import { XTerm } from "react-xtermjs";

const MemoizedTerminal = memo(XTerm);
export function Terminal() {
  const [addons, setAddons] = useState<ITerminalAddon[]>([]);
  useEffect(() => {
    const fitAddon = new FitAddon();
    const clipboardAddon = new ClipboardAddon();
    setAddons([fitAddon, clipboardAddon]);

    return () => {
      fitAddon.dispose();
      clipboardAddon.dispose();
    };
  }, []);
  return <MemoizedTerminal addons={addons} />;
}
