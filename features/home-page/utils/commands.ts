import { type UseNavigateResult } from "@tanstack/react-router";
import { type SystemFiles, type File } from "../../../hooks/useFiles";
import { logo } from "./logo";
import fs from "@zenfs/core";

function ltrim(str: string): string {
  if (!str) return str;
  return str.replace(/^\s+/g, "");
}

const commandOuputs = async (
  commandString: string,
  fileSystem: SystemFiles,
  navigation: UseNavigateResult<string>,
) => {
  const [command, args = ""] = commandString.split(/(?<=^\S+)\s/);
  switch (command) {
    // "help"
    case commandsList[0]:
      return help;

    // "ls"
    case commandsList[1]: {
      const files = fs.readdirSync(fileSystem.currentDir);

      return files.join("\t");
    }

    // "pwd"
    case commandsList[2]:
      return fileSystem.currentDir;

    // "hostname"
    case commandsList[3]:
      return document.location.hostname;

    // "ps"
    case commandsList[4]:
      return "Your browser is definitely running. That's the only thing I can say 🤪";

    // "fastfetch"
    case commandsList[5]:
      return fastfetch;

    // "links"
    case commandsList[6]:
      return links;

    // "logo"
    case commandsList[7]:
      return logo;

    // "touch"
    case commandsList[8]:
      fileSystem.touchFile(ltrim(args));
      return "";

    // "echo"
    case commandsList[9]: {
      // ajustar data com space e filename que tem space
      const echo = ltrim(args);
      const [data = "", filename] = echo.split(/[>]{2}|[>]/, 2);

      if (filename.trim().length === 0) {
        return "error at end of \\n, probably did not type anything at end";
      }

      let redirect = false;
      let appendRedirect = false;

      if (echo.includes(">>")) {
        appendRedirect = true;
      } else if (echo.includes(">")) {
        redirect = true;
      }

      if (appendRedirect) {
        fileSystem.appendRedirectionFile({
          name: ltrim(filename),
          data: data,
        } as File);
        return "";
      } else if (redirect) {
        fileSystem.redirectionFile({
          name: ltrim(filename),
          data: data,
        } as File);
        return "";
      } else if (!appendRedirect && !redirect) {
        return args;
      }

      break;
    }

    // "rm"
    case commandsList[10]:
      fileSystem.removeFile(args);
      return "";

    // "cd"
    case commandsList[11]: {
      let dir = ltrim(args);
      if (dir.slice(0, 2) === "./") {
        dir = `${fileSystem.currentDir}${dir.slice(0, 1)}`;
      }

      return fileSystem.changeDir(dir);
    }

    // "cat"
    case commandsList[12]: {
      // adjust the cat file
      const currDir = fileSystem.currentDir;
      const contents = fs.readFileSync(`${currDir}/${args}`, "utf-8");
      return contents;
    }

    // "mkdir"
    case commandsList[13]:
      fileSystem.createDir(args);
      return "";

    // "rmdir"
    case commandsList[14]:
      fileSystem.removeDir(args);
      return "";

    // "blog"
    case commandsList[15]:
      await navigation({ to: "/blog" });
      return "";

    default:
      return `bash: command not found: ${command}.\r\n\rEnter "help" to see the list of supported commands`;
  }
};

const commandsList: string[] = [
  "help",
  "ls",
  "pwd",
  "hostname",
  "ps",
  "fastfetch",
  "links",
  "logo",
  "touch",
  "echo",
  "rm",
  "cd",
  "cat",
  "mkdir",
  "rmdir",
  "blog",
];

// ajustar os commandos
const help = `List of supported commands:\r\n
Normal commands supported like bash:\r\t
ls \t\t   list all files in directory\r\t
pwd\t\t   print the current directory\r\t
hostname\t   print the hostname\r\t
ps\t\t   snap of current process\r\t
touch <filename>   create a file\r\t
echo\t\t   echo something\r\t
rm <filename>\t   remove a file\r\t
cd <directory>\t   changing directory\r\t
cat <filename>\t   print the contents of a file\r\t
mkdir <directory>  make a directory\r\t
rmdir <directory>  remove a directory\r\n
Custom commands supported:\r\t
help\t   list all commands available\r\t
fastfetch  fetch system information\r\t
links\t   print my links\r\t
logo\t   print the logo\r\t
blog\t   go to my blog\r\t
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
