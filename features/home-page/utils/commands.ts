import { SystemFiles, File } from "../../../hooks/useFiles";
import { logo } from "./logo";

function splitCommand(commandString: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [command, _] = commandString.split(/(?<=^\S+)\s/)

  return command
}

function ltrim(str: string): string {
  if(!str) return str;
  return str.replace(/^\s+/g, '');
}

const commandOuputs = async (commandString: string, fileSystem: SystemFiles) => {
  const [command, args = ""] = commandString.split(/(?<=^\S+)\s/)
  switch (command) {
  case commandsList[0]:
    return help;

  case commandsList[1]:
    return fileSystem.files.map((v) => `${v.name}`).join("\t");

  case commandsList[2]:
    return document.location.pathname;

  case commandsList[3]:
    return document.location.hostname;

  case commandsList[4]:
    return "Your browser is definitely running. That's the only thing I can say 🤪";

  case commandsList[5]:
    return fastfetch;

  case commandsList[6]:
    return links;

  case commandsList[7]:
    return logo;

  case splitCommand(commandsList[8]):
    fileSystem.touchFile(args);
    return ""

  case commandsList[9]: {
    const echo = ltrim(args)
    const [data, echoArgs] = echo.split(/(?<=^\S+)\s/)
    const [type, str] = echo.split(/(?<=^\S+)\s/)

    if (type !== ">" && type !== ">>") {
      return args
    }

    if (str === undefined) {
      return "error at end of \\n, probably did not type anything at end"
    }

    if (type === ">") {
      fileSystem.redirectionFile({ name: args, data: args} as File);
    }

    if (type === ">>") {
      fileSystem.appendRedirectionFile({ name: args, data: args} as File);
    }

    break
  }

  case commandsList[10]:
    fileSystem.removeFile(args);
    return ""

  default:
    return `bash: command not found: ${command}.\r\n\rEnter "help" to see the list of supported commands`;
  }
};

const commands = {
  "help": `\t\t  list all commands available`,
  "ls": "\t\t  list all files in directory",
  "pwd": `\t\t  print the current directory`,
  "hostname": `\t  print the hostname`,
  "ps": `\t\t  snap of current process`,
  "fastfetch": `\t  fetch system information`,
  "links": `\t\t  print my links`,
  "logo": `\t\t  print the logo`,
  "touch <filename>": ` create a file`,
  "echo": `\t\t  echo something`,
  "rm": `\t\t  remove a file`,
};

const commandsList: string[] = Object.keys(commands);

const help = `List of supported commands:\r\n\r\t
${Object.entries(commands)
    .map(([key, val]) => `${key} ${val}`)
    .join("\r\n\r\t")}
`;

const DEBIAN_COLOR = "\u001b[38;2;215;10;83m";
const TEXT_COLOR = "\u001b[38;2;200;200;200m";

const links = `
  ${DEBIAN_COLOR}Linkedin:   ${TEXT_COLOR}https://www.linkedin.com/in/lucasmahuni2004/\r
  ${DEBIAN_COLOR}Github:     ${TEXT_COLOR}https://github.com/mahauni/\r
  ${DEBIAN_COLOR}Potifolio:  ${TEXT_COLOR}https://mahauni.github.io/\r
  ${DEBIAN_COLOR}CV's:       ${TEXT_COLOR}https://github.com/mahauni/curriculum/\r
\u001b[38;2;192;202;245m`;

export const fastfetch = `${DEBIAN_COLOR}
        _,met$$$$$gg.          mahauni@debian\r
     ,g$$$$$$$$$$$$$$$P.       ${TEXT_COLOR}--------------\r${DEBIAN_COLOR}
   ,g$$P""       """Y$$.".     OS: ${TEXT_COLOR}Debian GNU/Linux 12 x86_64\r${DEBIAN_COLOR}
  ,$$P'              \`$$$.     Host: ${TEXT_COLOR}Inspiron 15 5510\r${DEBIAN_COLOR}
',$$P       ,ggs.     \`$$b:    Kernel: ${TEXT_COLOR}Linux 6.12.10-76061203-generic\r${DEBIAN_COLOR}
\`d$$'     ,$P"'   .    $$$     Shell: ${TEXT_COLOR}zsh 5.8.1\r${DEBIAN_COLOR}
 $$P      d$'     ,    $$P     Theme: ${TEXT_COLOR}Dark\r${DEBIAN_COLOR}
 $$:      $$.   -    ,d$$'     Terminal: ${TEXT_COLOR}-tmux: server\r${DEBIAN_COLOR}
 $$;      Y$b._   _,d$P'       WM Theme: ${TEXT_COLOR}Dark\r${DEBIAN_COLOR}
 Y$$.    \`.\`"Y$$$$P"'          Icons: ${TEXT_COLOR}Debian\r${DEBIAN_COLOR}
 \`$$b      "-.__               Locale: ${TEXT_COLOR}en_US.UTF-8\r${DEBIAN_COLOR}
  \`Y$$b                        Hobbies: ${TEXT_COLOR}Read novels, mangas and play video-games\r${DEBIAN_COLOR}
   \`Y$$.                       Languages: ${TEXT_COLOR}Go, Python, Typescript, Java\r${DEBIAN_COLOR}
     \`$$b.                     Code Editor: ${TEXT_COLOR}Neovim\r${DEBIAN_COLOR}
       \`Y$$b.                  Tools: ${TEXT_COLOR}Docker, Kubernetes, PostgreSQL\r${DEBIAN_COLOR}
         \`"Y$b._               \r
             \`""""             \r
\u001b[38;2;192;202;245m`;

export default commandOuputs;
