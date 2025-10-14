import { useEffect, useRef, useState } from "react";
import TerminalComponent from "./components/Terminal/TerminalComponent";
import commandOuputs from "./utils/commands";
import { logo } from "./utils/logo.ts";
import { FitAddon } from "@xterm/addon-fit";
import { TokyoNightTheme } from "./utils/tokyonight";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { useFiles } from "../../hooks/useFiles.tsx";
import { useNavigate } from "@tanstack/react-router"

export default function HomePage() {
  const [terminalText, setTerminalText] = useState("");
  const fitAddon = new FitAddon();
  const webLiinksAddon = new WebLinksAddon();
  const files = useFiles()
  const navigation = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const terminalRef = useRef<any>(null);

  useEffect(() => {
    terminalRef.current?.terminal.writeln(logo);
    terminalRef.current?.terminal.write(files.getTerminalHostName());

    window.addEventListener("resize", () => {
      fitAddon.fit();
    });

    fitAddon.fit();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (terminalRef.current as any).props.addons.shift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onData(data: any) {
    const terminal = terminalRef.current?.terminal;
    const code = data.charCodeAt(0);

    if (terminal === null || terminalText.length < 0) return;

    if (terminalText === "clear" || terminalText === "cls") {
      terminal.reset();
      setTerminalText("");
      terminal.write(files.getTerminalHostName());
      return false;
    }

    // Block Ctrl key combinations (codes 1-26, excluding specific ones you want)
    if (code >= 1 && code <= 26 && code !== 12 && code !== 13) {
      // Optionally handle specific Ctrl combinations you want to support
      // For example, Ctrl+C (code 3), Ctrl+D (code 4), etc.
      return;
    }

    switch (code) {
    case 12:
      terminal.reset();
      terminal.write(files.getTerminalHostName());
      break;

    case 13:
      commandOuputs(terminalText, files, navigation).then((output) => {
        terminal.write(`\r\n${output}\r\n`);
        terminal.write(files.getTerminalHostName());
        setTerminalText("");
      })
      break;

    case 27:
      if (data.endsWith("A") || data.endsWith("B")) return;

      terminal.write(data);
      setTerminalText((prevState) => prevState + data);
      break;

    case 127:
      if (terminalText) {
        terminal.write(`\b \b`);
        setTerminalText((prevState) =>
          prevState.substring(0, prevState.length - 1),
        );
      }
      break;

    default:
      terminal.write(data);
      setTerminalText((prevState) => prevState + data);
    }
  }

  return (
    <div className="h-screen, w-screen pl-2">
      <TerminalComponent
        className="h-screen w-screen"
        addons={[fitAddon, webLiinksAddon]}
        key="test"
        ref={terminalRef}
        onData={onData}
        options={{
          allowProposedApi: true,
          fontFamily: "Fira Code, monospace",
          theme: TokyoNightTheme,
          fontSize: 16,
        }}
      />
    </div>
  );
}
