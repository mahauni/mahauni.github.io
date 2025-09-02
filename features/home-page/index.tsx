import { useEffect, useRef, useState } from "react";
import TerminalComponent from "./components/Terminal/TerminalComponent";
import commandOuputs from "./utils/commands";
import { FitAddon } from "@xterm/addon-fit";
import { TokyoNightTheme } from "./utils/tokyonight";
import { WebLinksAddon } from "@xterm/addon-web-links";

export default function HomePage() {
  const [terminalText, setTerminalText] = useState("");
  const terminalHostName = "root@mahauni~$ ";
  const fitAddon = new FitAddon();
  const webLiinksAddon = new WebLinksAddon();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const terminalRef = useRef<any>(null);

  useEffect(() => {
    terminalRef.current?.terminal.writeln(
      `Enter "help" to see the list of supported commands\r\n\rPress (Cntl + L) to clear the console`,
    );
    terminalRef.current?.terminal.write(terminalHostName);

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
      terminal.write(terminalHostName);
      return false;
    }

    switch (code) {
      case 12:
        terminal.reset();
        terminal.write(terminalHostName);
        break;

      case 13:
        commandOuputs(terminalText, []).then((output) => {
          terminal.write(`\r\n${output}\r\n`);
          terminal.write(terminalHostName);
          setTerminalText("");
        });
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
    <div className="h-screen, w-screen">
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
