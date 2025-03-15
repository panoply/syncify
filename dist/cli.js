'use strict';

var syncify_js = require('./syncify.js');
var node_path = require('node:path');
var node_process = require('node:process');
var node_util = require('node:util');

// syncify/cli/help/utils.ts
function describe(message) {
  return syncify_js.$.terminal.cols < 75 ? "" : syncify_js.a(`\u203A    ${message}`);
}
function highlight(input) {
  return input.replace(/([${},<>])/g, syncify_js.a("$1")).replace(/\s(-{1,2})(?=[a-zA-Z])/g, syncify_js.a(" $1")).replace(/(\[options\])/g, `${syncify_js._t}options${syncify_js.jt}`);
}
function encase({ banner = false }) {
  const arrow = `${syncify_js.mD("SB", syncify_js.a("\u25B2"))} AND DOWN ${syncify_js.mD("SB", syncify_js.a("\u25BC"))}`;
  const label = syncify_js.a(`UP ${arrow} ARROW KEYS TO SCROLL`);
  const header = syncify_js.pt().Break(2).Top(label, false).Newline();
  const footer = syncify_js.pt().Newline(2).End(label, false).Break();
  if (banner) {
    header.Line("\u2588\u2580\u2580 \u2588 \u2588 \u2588\u2580\u2588 \u2588\u2580\u2580 \u2580\u2588\u2580 \u2588\u2580\u2580 \u2588 \u2588", syncify_js.F).Line("\u2580\u2580\u2588 \u2580\u2580\u2588 \u2588 \u2588 \u2588    \u2588  \u2588\u2580\u2580 \u2580\u2580\u2588", syncify_js.F).Line("\u2580\u2580\u2580 \u2580\u2580\u2580 \u2580 \u2580 \u2580\u2580\u2580 \u2580\u2580\u2580 \u2580   \u2580\u2580\u2580", syncify_js.F).Newline();
  }
  return [header.toString(), footer];
}

// syncify/cli/help/default.ts
function Default() {
  syncify_js.pt().Header(`HELP${syncify_js.R}`, syncify_js.y).Line(` $ sy help                       ${describe("Prints this screen")}`).Line(` $ sy help {mode}                ${describe("Pick a mode and view usage guide")}`).Line(` $ sy help examples              ${describe("Real world command line examples")}`).Header(`USAGE${syncify_js.R}`, syncify_js.y).Line(` $ sy {mode}                     ${describe("Command mode is required")}`).Line(` $ sy {mode} --flags             ${describe("Flags can be provided to modes")}`).Line(` $ sy {mode} [options]           ${describe("Some modes accept positionals")}`).Line(` $ sy {mode} [options] --flags   ${describe("Mode with positional and flags")}`).Header("MODES" + syncify_js.R, syncify_js.y).Line(` $ sy init                       ${describe("Setup Syncify in existing project")}`).Line(` $ sy build                      ${describe("Build theme from source")}`).Line(` $ sy watch                      ${describe("Watch and rebuild changes")}`).Line(` $ sy pull                       ${describe("Download from a store theme")}`).Line(` $ sy push                       ${describe("Upload to a store theme")}`).Line(` $ sy create                     ${describe("Create a new Syncify project")}`).Line(` $ sy publish                    ${describe("Changes a theme role to and makes it main")}`).Line(` $ sy delete                     ${describe("Remove files/resources from a store or theme")}`).Line(` $ sy pack                       ${describe("Generate a .zip package of the current theme")}`).Line(` $ sy link                       ${describe("Link existing themes/s from a store")}`).Line(` $ sy unlink                     ${describe("Remove a linked theme/s from project")}`).Line(` $ sy duplicate                  ${describe("Duplicates an existing theme in a store")}`).Line(` $ sy keychain                   ${describe("Access the global token keychain")}`).Line(` $ sy git                        ${describe("Git integration configuration and information")}`).Line(` $ sy prune                      ${describe("Clears internal project caches from disk")}`).Line(` $ sy inspect                    ${describe("Prints information about Syncify installation")}`).Line(` $ sy projects                   ${describe("Lists all Syncify projects on this device")}`).Line(` $ sy doctor                     ${describe("Diagnostics and fixable operations")}`).Line(` $ sy help                       ${describe("Print complete command list")}`).Header(`FLAGS${syncify_js.R}`, syncify_js.y).Line(` --input,  -i                    ${describe("Define input (source) directory")}`).Line(` --output, -o                    ${describe("Define output directory")}`).Line(` --config, -c                    ${describe("Define config directory")}`).Line(` --hot,    -h                    ${describe("HOT Reload when running watch mode")}`).Line(` --target, -T                    ${describe("Theme and store targeting")}`).Line(` --filter, -F                    ${describe("File filtering and globs")}`).Line(` --align                         ${describe("Subset theme file merge with remote sources")}`).Line(` --new                           ${describe("Used with sy pull to create a new theme")}`).Line(` --bind                          ${describe("Live bindings in watch mode")}`).Line(` --dev                           ${describe("Development environment (default)")}`).Line(` --prod                          ${describe("Production environment")}`).Line(` --terse                         ${describe("Terse distribution (minification)")}`).Line(` --clean                         ${describe("Clean output directory")}`).Line(` --silent                        ${describe("Suppress logging via stdout")}`).Line(` --patch                         ${describe("Apply a patch version bump")}`).Line(` --minor                         ${describe("Apply a minor version bump")}`).Line(` --major                         ${describe("Apply a major version bump")}`).Line(` --force                         ${describe("Force overwrite or action (caution)")}`).Line(` --batch                         ${describe("Control batch limit (default is 10)")}`).Ruler().Append("\xA9 2025 \u039D\u03B9\u03BA\u03BF\u03BB\u03B1\u03C2 \u03A3\u03B1\u03B2\u03B2\u03B9\u03B4\u03B7\u03C2", syncify_js.a.bold).Line(`Version${syncify_js.R}  ${syncify_js.$.version}`, syncify_js.a).Line(`License${syncify_js.R}  Apache 2.0`, syncify_js.a).Line(`Website${syncify_js.R}  ${syncify_js.Ce("https://syncify.sh")}`, syncify_js.a).Line(`Github${syncify_js.R}   ${syncify_js.Ce("https://github.com/panoply/syncify")}`, syncify_js.a).Line(`Discord${syncify_js.R}  ${syncify_js.Ce("https://discord.gg/shopify-developers-597504637167468564")}`, syncify_js.a).Newline().toString((input) => {
    const [header, footer] = encase({ banner: true });
    const heading = syncify_js.Fo({ input: header, height: 8 });
    const content = syncify_js.Fo({
      input: highlight(input),
      yPos: 8,
      height: syncify_js.$.terminal.rows - 12
    });
    heading.print();
    content.print();
    content.setKeypress(syncify_js.$.terminal.rows, content.maxHeight);
    footer.toLog();
  });
}

// syncify/cli/help/information.ts
function Inspect() {
  syncify_js.log.clear();
  syncify_js.pt().Top("Inspect").Header(`${syncify_js.ze.bold("@syncify/cli")}`).Line(`${syncify_js.a("VERSION")}${syncify_js.R}  v${syncify_js.Y("1.0.0-alpha.1")}`).Line(`${syncify_js.a("HOT")}${syncify_js.R}      v${syncify_js.Y("0.4.9")}`).Line(`${syncify_js.a("LICENSE")}${syncify_js.R}  ${syncify_js.Y("Apache 2.0")}`).Line(`${syncify_js.a("AUTHOR")}${syncify_js.R}   ${syncify_js.Y("\u039D\u03B9\u03BA\u03BF\u03BB\u03B1\u03C2 \u03A3\u03B1\u03B2\u03B2\u03B9\u03B4\u03B7\u03C2")}`).Line(`${syncify_js.a("PM")}${syncify_js.R}       ${syncify_js.Y(syncify_js.$.pm)}`).Line(`${syncify_js.a("OS")}${syncify_js.R}       ${syncify_js.Y(syncify_js.$.platform)}`).Line(`${syncify_js.a("BINARY")}${syncify_js.R}   ${syncify_js.Y(syncify_js.$.using)}`).Line(`${syncify_js.a("CWD")}${syncify_js.R}      ${syncify_js.Y(syncify_js.$.cwd)}`).Line(`${syncify_js.a("HASH")}${syncify_js.R}     ${syncify_js.Y(syncify_js.$.hash)}`).Line(`${syncify_js.a("SCRIPT")}${syncify_js.R}   ${syncify_js.Y(syncify_js.$.bin)}`).Line(`${syncify_js.a("MODULE")}${syncify_js.R}   ${syncify_js.Y(syncify_js.$.dirs.module)}`).Line(`${syncify_js.a("STORE")}${syncify_js.R}    ${syncify_js.Y(syncify_js.$.home)}`).Line(`${syncify_js.a("KEYCHAIN")}${syncify_js.R} ${syncify_js.Y(`${syncify_js.$.file.keychain}`)}`).Line(`${syncify_js.a("GITHUB")}${syncify_js.R}   ${syncify_js.Y(syncify_js.$.github)}`).Line(`${syncify_js.a("WEBSITE")}${syncify_js.R}  ${syncify_js.Y("https://syncify.sh")}`).NL.End("Inspect").BR.toLog();
}
function Version() {
  syncify_js.log.clear();
  syncify_js.pt().Top("Version").NL.Line(`${syncify_js.Y("@syncify/cli")} ${syncify_js.K} ${syncify_js.Y("v1.0.0-alpha.1")}`).Line(`${syncify_js.Y("@syncify/hot")} ${syncify_js.K} ${syncify_js.Y("v0.4.9")}`).NL.End("Version").BR.toLog();
}

// syncify/cli/help/modes.ts
function Modes(mode) {
  if (mode in Modes) return Modes[mode]();
  const tui = syncify_js.pt().Top(`Syncify ${syncify_js.Ri} Error`, false).Header("NOT YET AVAILABLE", syncify_js.P.bold);
  if (syncify_js.COMMAND_MODES.has(mode)) {
    const message = [
      `Help reference for the ${syncify_js.y(`sy help ${mode}`)} command is not yet available to`,
      `${syncify_js.y("sy help")} but is slated for inclusion in upcoming releases.`,
      "The command itself is valid and functional, only the help information is unavailable."
    ];
    const modes = syncify_js.toArray(syncify_js.COMMAND_MODES).filter((n) => n !== "help").sort((a2, b) => a2 in Modes === b in Modes ? 0 : a2 in Modes ? -1 : 1);
    const equal = syncify_js.eqWS(modes, { padding: 0 });
    tui.Wrap(message, syncify_js.P).Newline().Each(modes, (name) => name in Modes ? tui.Line(`$ sy help ${name} ${equal(name) + syncify_js.Pi}`, syncify_js.Y) : tui.Line(`$ ${syncify_js.fi(`sy help ${name}`)}`, syncify_js.a));
  }
  tui.Newline().End(`Syncify ${syncify_js.Ri} Error`, false).Break().toLog(highlight);
}
Modes.push = () => {
  syncify_js.pt().Top(`help ${syncify_js.Be} sy push`, false).Header(`COMMANDS${syncify_js.R}`, syncify_js.y).Line(" $ sy push").Line(" $ sy push --flags").Header(`FLAGS${syncify_js.R}`, syncify_js.y).Line(` --force               ${describe("Skips diffing and force overwrites")}`).Line(` --filter, -F          ${describe("filter specific files/directories")}`).Line(` --target, -T          ${describe("Target a theme or store")}`).Line(` --batch <number>      ${describe("Upsert batch limits (default 10)")}`).Newline().End(`help ${syncify_js.Be} sy push`, false).Break().toLog(highlight);
};
Modes.pull = () => {
  syncify_js.pt().Top(`help ${syncify_js.Be} sy pull`, false).Header(`COMMANDS${syncify_js.R}`, syncify_js.y).Line(" $ sy pull").Line(" $ sy pull --flags").Header(`FLAGS${syncify_js.R}`, syncify_js.y).Line(` --filter, -F          ${describe("filter specific files/directories")}`).Line(` --target, -T          ${describe("Target a theme or store")}`).Line(` --merge               ${describe(`Merges local ${syncify_js.Li} remote theme`)}`).Line(` --align               ${describe(`Align local ${syncify_js.Li} remote theme JSON files`)}`).Line(` --force               ${describe("Skips diffing and force overwrites")}`).Line(` --output, -o          ${describe("Controls where theme file/s are written")}`).Line(` --batch <number>      ${describe("Upsert batch limits (default 10)")}`).Newline().End(`help ${syncify_js.Be} sy push`, false).Break().toLog(highlight);
};
Modes.watch = () => {
  syncify_js.pt().Top(`help ${syncify_js.Be} sy watch`, false).Header(`COMMANDS${syncify_js.R}`, syncify_js.y).Line(" $ sy watch").Line(" $ sy watch --flags").Header(`FLAGS${syncify_js.R}`, syncify_js.y).Line(` --target, -T         ${describe("Target a theme or store")}`).Line(` --filter, -F          ${describe("filter specific files/directories")}`).Line(` --hot                ${describe("Activates HOT Reloading")}`).Line(` --align              ${describe("Align local theme JSON files before watching")}`).Line(` --bind               ${describe("Activates 2 way bindings")}`).Line(` --terse              ${describe("Terse minification")}`).Line(` --dev                ${describe("Development build mode (default)")}`).Line(` --prod               ${describe("Production build mode")}`).Newline().End(`help ${syncify_js.Be} sy watch`, false).toLog(highlight);
};
Modes.inspect = () => {
  syncify_js.pt().Top(`help ${syncify_js.Be} sy inspect`, false).Header(`DESCRIPTION${syncify_js.R}`, syncify_js.y).Wrap("Prints information about project/s and your syncify installation.", syncify_js.a).Header(`COMMANDS${syncify_js.R}`, syncify_js.y).Line(" $ sy inspect").Newline().End(`help ${syncify_js.Be} sy inspect`, false).Break().toLog(highlight);
};
Modes.create = () => {
  const description = [
    "The create command is an interactive command prompt. You can (optionally)",
    "provide a strap name option to skip choice selection. Options with strikethrough",
    "are either deprecated or not yet available for use."
  ];
  const message = syncify_js.pt().Top(`help ${syncify_js.Be} sy create`, false).Header(`DESCRIPTION${syncify_js.R}`, syncify_js.y).Wrap(description, syncify_js.a).Header(`COMMANDS${syncify_js.R}`, syncify_js.y).Line(" $ sy create").Line(` $ sy create ${syncify_js.mD("AN", "strap")}`).Header(`OPTIONS${syncify_js.R}`, syncify_js.y);
  const straps = [...syncify_js.STRAP_THEMES, ...syncify_js.STRAP_EXAMPLES];
  const eq = syncify_js.eqWS(straps.map(([name]) => name), { padding: 2 });
  syncify_js.forEach(([name, desc, unavilable]) => {
    const line = unavilable ? ` $ ${syncify_js.fi(`sy create ${name}`)}${eq(name)} ${describe("unavilable")}` : ` $ sy create ${name}${eq(name)} ${describe(desc.trim())}`;
    message.Line(line);
  }, straps);
  message.Newline().End(`help ${syncify_js.Be} sy push`, false).Break().toLog(highlight);
};
Modes.build = () => {
  syncify_js.pt().Top(`help ${syncify_js.Be} sy build`, false).Header(`COMMANDS${syncify_js.R}`, syncify_js.y).Line(" $ sy build").Line(" $ sy build --flags").Line(` $ sy build ${syncify_js.mD("SB", "option")}`).Line(` $ sy build ${syncify_js.mD("SB", "option")} --flags`).Header(`OPTIONS${syncify_js.R}`, syncify_js.y).Line(` $ sy build script       ${describe("Run build on script transform")}`).Line(` $ sy build style        ${describe("Run build on style transform")}`).Line(` $ sy build svg          ${describe("Run build on svg transform")}`).Line(` $ sy build liquid       ${describe("Run build on liquid transform")}`).Line(` $ sy build json         ${describe("Run build on json transform")}`).Header(`FLAGS${syncify_js.R}`, syncify_js.y).Line(` --terse                 ${describe("Terse minification")}`).Line(` --dev                   ${describe("Development build mode (default)")}`).Line(` --prod                  ${describe("Production build mode")}`).Newline().End(`help ${syncify_js.Be} sy build`, false).toLog(highlight);
};

// syncify/cli/help/suggest.ts
function Suggest() {
  syncify_js.pt().Top(`Syncify ${syncify_js.Ri} Error`, false).Header("1.0.0-alpha.1", syncify_js.y).Error("Please provide a command line argument", syncify_js.y.redBright).Header(`USAGE${syncify_js.R}`, syncify_js.y).Line(` $ sy <${syncify_js.oi("mode")}>`).Line(` $ sy <${syncify_js.oi("mode")}> --flags`).Line(` $ sy <${syncify_js.oi("mode")}> [options]`).Line(` $ sy <${syncify_js.oi("mode")}> [options] --flags`).Header(`HELP${syncify_js.R}`, syncify_js.y).Line(" $ sy help").Line(` $ sy help <${syncify_js.oi("mode")}>`).Line(` $ sy help <${syncify_js.oi("flag")}>`).Newline().End(`Syncify ${syncify_js.Ri} Error`, false).Break().toLog(highlight);
}

// syncify/modes/help.ts
function Help(mode) {
  syncify_js.log.clear();
  if (mode.suggest) {
    Suggest();
  } else if (mode.inspect) {
    Inspect();
  } else if (mode.version) {
    Version();
  } else {
    const target = mode._;
    if (syncify_js.isNull(target)) {
      Default();
    } else {
      Modes(target);
    }
  }
}

// syncify/options/command.ts
var flags = () => ({
  input: { type: "string", short: "i" },
  output: { type: "string", short: "o" },
  config: { type: "string", short: "c" },
  target: { type: "string", multiple: true, short: "T" },
  filter: { type: "string", multiple: true, short: "F" },
  help: { type: "boolean", short: "h" },
  version: { type: "boolean", short: "v" },
  align: { type: "boolean" },
  merge: { type: "boolean" },
  dev: { type: "boolean" },
  prod: { type: "boolean" },
  terse: { type: "boolean" },
  clean: { type: "boolean" },
  silent: { type: "boolean" },
  batch: { type: "string" },
  hot: { type: "boolean" },
  bind: { type: "boolean" },
  force: { type: "boolean" },
  patch: { type: "boolean" },
  minor: { type: "boolean" },
  major: { type: "boolean" },
  main: { type: "boolean" },
  unpublished: { type: "boolean" }
});
function parse(cmd) {
  syncify_js.log.clear();
  const fallback = [
    { mode: "suggest" },
    { values: null, positionals: null, tokens: null }
  ];
  if (node_process.argv.length === 2) {
    syncify_js.$.mode.suggest = true;
    return fallback;
  } else {
    const find = node_process.argv[2];
    switch (find) {
      case "-v":
      case "--version":
        syncify_js.$.mode.help = true;
        syncify_js.$.mode.version = true;
        fallback[0].mode = "version";
        return fallback;
      case "-h":
      case "--help":
        syncify_js.$.mode.help = true;
        fallback[0].mode = "help";
        return fallback;
    }
    let i = -1;
    let s = cmd.length;
    while (++i < s) if (cmd[i].mode === find) break;
    if (i === s) {
      syncify_js.throwCommand([
        `Invalid positional or mode${syncify_js.R} "${syncify_js.w.bold(find)}"
`,
        "You must provide a known and valid execution mode.",
        `For a list of available modes, run the help command${syncify_js.R}

`,
        `${syncify_js.a("$")} ${syncify_js.li("sy help modes")}`
      ]);
    }
    const flag = flags();
    const mode = cmd[i];
    const options = syncify_js.o();
    if ("flags" in mode) {
      i = -1;
      s = mode.flags.length;
      while (++i < s) {
        if (mode.flags[i] in flag) {
          options[mode.flags[i]] = flag[mode.flags[i]];
        } else {
          syncify_js.throwCommand([
            `Unknown flag expression provided "${syncify_js.y(`--${mode.flags[i]}`)}"
`,
            `Accepted flags for ${syncify_js.y(mode.mode)} mode${syncify_js.R}

`,
            `${syncify_js.g.nl(mode.flags.map((v) => syncify_js.a("--") + syncify_js.li(v)))}`
          ]);
        }
      }
    }
    try {
      const args = node_util.parseArgs(
        {
          args: node_process.argv,
          allowPositionals: true,
          tokens: true,
          options
        }
      );
      return [mode, args];
    } catch (error) {
      syncify_js.throwCommand(error.message.replace(/(--?)([a-z-]+)?/g, syncify_js.w.bold("$1$2")));
    }
  }
}
function positional(cmd, tokens) {
  function parseBuild() {
    if (tokens.length > 1) {
      syncify_js.throwCommand([
        `Invalid positional ${syncify_js.y("build")} arguments expression provided. No more than 1 transform`,
        `can be passed. Use comma ${syncify_js.y(",")} separated expression instead, e.g:

`,
        `${syncify_js.a("$")} ${syncify_js.li(`sy build ${syncify_js.y(tokens.join(syncify_js.a(",")))}`)}`
      ]);
      return false;
    } else {
      if (tokens[0].indexOf(",") > -1) {
        for (const transform of tokens[0].split(",")) {
          if (!syncify_js.includes(transform, cmd.accepts)) {
            syncify_js.throwCommand([
              `Invalid ${syncify_js.y("sy build")} transform "${syncify_js.y(transform)}" provided.`,
              `Must be one of the following${syncify_js.R}

`,
              `${syncify_js.g.nl(cmd.accepts.map((v) => syncify_js.li(v)))}`
            ]);
            return false;
          } else {
            syncify_js.$.mode[transform] = true;
            return true;
          }
        }
      } else {
        if (!syncify_js.includes(tokens[0], cmd.accepts)) {
          syncify_js.throwCommand([
            `Invalid ${syncify_js.y("sy build")} transform "${syncify_js.y(tokens[0])}"`,
            `Must be one of the following${syncify_js.R}

`,
            `${syncify_js.g.nl(cmd.accepts.map((v) => syncify_js.li(v)))}`
          ]);
          return false;
        } else {
          syncify_js.$.mode[tokens[0]] = true;
          return true;
        }
      }
    }
  }
  function parseHelp() {
    if (cmd.accepts.includes(tokens[0])) {
      syncify_js.$.mode._ = tokens[0];
      return true;
    } else {
      syncify_js.throwCommand([
        `Invalid ${syncify_js.y("sy help")} argument "${syncify_js.y(tokens[0])}" ${syncify_js.Be}`,
        `Must be one of the following${syncify_js.R}

`,
        `${syncify_js.g.nl(cmd.accepts.map((v) => `${syncify_js.It} sy help ${v}`))}`
      ]);
      return false;
    }
  }
  function parseKeychain() {
    if (cmd.accepts.includes(tokens[0])) {
      syncify_js.$.mode._ = tokens[0];
      return true;
    } else {
      syncify_js.throwCommand([
        `Invalid ${syncify_js.y("keychain")} argument "${syncify_js.y(tokens[0])}" ${syncify_js.Be}`,
        `Must be one of the following${syncify_js.R}

`,
        `${syncify_js.g.nl(cmd.accepts.map((v) => `${syncify_js.It} ${syncify_js.li(v)}`))}`
      ]);
      return false;
    }
  }
  if (syncify_js.$.mode.build) return parseBuild();
  if (syncify_js.$.mode.help) return parseHelp();
  if (syncify_js.$.mode.keychain) return parseKeychain();
  return true;
}
function command(commands) {
  syncify_js.runtime();
  const [cmd, flags2] = parse(commands);
  if (cmd.mode === "suggest") {
    Help(syncify_js.$.mode);
    return syncify_js.NooP;
  }
  const [node, bin] = node_process.argv;
  const position = positional(cmd, flags2.positionals.slice(3));
  syncify_js.event.mode(cmd.mode);
  syncify_js.$.node = node;
  syncify_js.$.bin = bin;
  syncify_js.$.argv = node_process.argv.slice(2);
  syncify_js.$.dirs.module = bin.slice(0, bin.lastIndexOf(syncify_js.DIST_PATH) + 12);
  syncify_js.$.using = syncify_js.$.dirs.module.startsWith(node_path.join(syncify_js.$.cwd, "node_modules")) ? "local" : "global";
  syncify_js.$.terminal.wrap = Math.round(syncify_js.$.terminal.cols - syncify_js.$.terminal.cols / 3);
  syncify_js.$.mode[cmd.mode] = true;
  if (syncify_js.$.mode.build) {
    syncify_js.$.log.mode = 4 /* Build */;
    syncify_js.$.mode.script = true;
    syncify_js.$.mode.style = true;
    syncify_js.$.mode.svg = true;
    syncify_js.$.mode.liquid = true;
    syncify_js.$.mode.json = true;
  } else {
    if (syncify_js.$.mode.watch) syncify_js.$.log.mode = 1 /* Watch */;
    if (syncify_js.isNull(syncify_js.$.log.mode) && syncify_js.$.mode.push) syncify_js.$.log.mode = 6 /* Push */;
    if (syncify_js.isNull(syncify_js.$.log.mode) && syncify_js.$.mode.pull) syncify_js.$.log.mode = 7 /* Pull */;
    if (syncify_js.isNull(syncify_js.$.log.mode) && syncify_js.$.mode.build) syncify_js.$.log.mode = 4 /* Build */;
    if (syncify_js.isNull(syncify_js.$.log.mode) && syncify_js.$.mode.pack) syncify_js.$.log.mode = 8 /* Pack */;
  }
  if (cmd.accepts !== null && syncify_js.$.argv.length > 1 && position === false) return syncify_js.NooP;
  if (syncify_js.$.mode.build) {
    syncify_js.$.mode.script = true;
    syncify_js.$.mode.style = true;
    syncify_js.$.mode.svg = true;
    syncify_js.$.mode.liquid = true;
    syncify_js.$.mode.json = true;
  }
  if (syncify_js.$.mode.help || syncify_js.$.mode.inspect) {
    Help(syncify_js.$.mode);
    return syncify_js.NooP;
  }
  syncify_js.assign(syncify_js.$.cmd, flags2.values);
  syncify_js.forKeys((mode) => mode in syncify_js.$.mode ? syncify_js.$.mode[mode] = true : null, flags2.values);
  syncify_js.$.env.prod = syncify_js.$.mode.prod;
  syncify_js.$.env.dev = syncify_js.$.mode.dev && !syncify_js.$.mode.prod;
  syncify_js.$.env.cli = true;
  node_process.env.SYNCIFY_ENV = syncify_js.$.env.dev ? "dev" : "prod";
  node_process.env.SYNCIFY_WATCH = String(syncify_js.$.mode.watch);
  node_process.env.SYNCIFY_VERSION = "1.0.0-alpha.1";
  return (fn) => fn();
}

// syncify/cli.ts
command(
  [
    {
      mode: "build",
      accepts: [
        "script",
        "style",
        "svg",
        "liquid",
        "json"
      ],
      flags: [
        "input",
        "output",
        "config",
        "filter",
        "dev",
        "prod",
        "terse",
        "clean",
        "silent"
      ]
    },
    {
      mode: "watch",
      accepts: null,
      flags: [
        "hot",
        "bind",
        "align",
        "input",
        "output",
        "config",
        "target",
        "filter",
        "dev",
        "prod",
        "terse",
        "clean",
        "silent"
      ]
    },
    {
      mode: "pack",
      accepts: null,
      flags: [
        "output",
        "config",
        "clean",
        "dev",
        "prod",
        "terse",
        "patch",
        "minor",
        "major"
      ]
    },
    {
      mode: "delete",
      accepts: null,
      flags: [
        "config",
        "target",
        "filter",
        "force"
      ]
    },
    {
      mode: "push",
      accepts: null,
      flags: [
        "input",
        "config",
        "target",
        "align",
        "filter",
        "force",
        "batch"
      ]
    },
    {
      mode: "pull",
      accepts: null,
      flags: [
        "output",
        "config",
        "target",
        "filter",
        "align",
        "merge",
        "force",
        "batch"
      ]
    },
    {
      mode: "publish",
      accepts: null,
      flags: [
        "output",
        "config",
        "patch",
        "minor",
        "major",
        "clean",
        "dev",
        "prod",
        "terse",
        "target",
        "main",
        "unpublished"
      ]
    },
    {
      mode: "version",
      accepts: null,
      alias: ["version"],
      flags: [
        "patch",
        "minor",
        "major"
      ]
    },
    {
      mode: "create",
      accepts: [
        "dawn",
        "dusk",
        "silk",
        "using-paths",
        "using-rename",
        "using-sass",
        "using-schema",
        "using-tailwind",
        "using-typescript"
      ]
    },
    {
      mode: "keychain",
      accepts: [
        "create",
        "update",
        "associate",
        "migrate",
        "inspect"
      ]
    },
    {
      mode: "help",
      alias: ["help"],
      accepts: [
        "examples",
        // SUPPORTED
        "watch",
        "build",
        "push",
        "pull",
        "create",
        "inspect",
        // TODO
        "export",
        "import",
        "stash",
        "publish",
        "version",
        "keychain",
        "projects",
        "theme",
        "git",
        "setup",
        "prune",
        "doctor"
      ]
    },
    {
      mode: "init",
      accepts: null
    },
    {
      mode: "projects",
      accepts: null
    },
    {
      mode: "link",
      accepts: null
    },
    {
      mode: "git",
      accepts: null
    },
    {
      mode: "prune",
      accepts: null
    },
    {
      mode: "doctor",
      accepts: null
    },
    {
      mode: "inspect",
      accepts: null
    }
  ]
)(syncify_js.syncify);
