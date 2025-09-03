import { logo } from "./logo";

const commandsList: string[] = [
  "help",
  "ls",
  "pwd",
  "hostname",
  "ps",
  "fastfetch",
  "links",
  "logo",
];

const commandOuputs = async (command: string, filesList: string[]) => {
  switch (command) {
    case commandsList[0]:
      return `List of supported commands:\r\n\r${commandsList.join("\r\n\r")}`;

    case commandsList[1]:
      return filesList.join("\r\n\r");

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

    default:
      return `bash: command not found: ${command}.\r\n\rEnter "help" to see the list of supported commands`;
  }
};

const DEBIAN_COLOR = "\u001b[38;2;215;10;83m";
const TEXT_COLOR = "\u001b[38;2;200;200;200m";

const links = `
  ${DEBIAN_COLOR}Linkedin:   ${TEXT_COLOR}https://www.linkedin.com/in/lucasmahuni2004/\r
  ${DEBIAN_COLOR}Github:     ${TEXT_COLOR}https://github.com/mahauni/\r
  ${DEBIAN_COLOR}Potifolio:  ${TEXT_COLOR}https://mahauni.github.io/\r
  ${DEBIAN_COLOR}CV's:       ${TEXT_COLOR}https://github.com/mahauni/curriculum/\r
`;

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
