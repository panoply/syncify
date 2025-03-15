function task() {
  echo ""
  echo "\033[0;36m--------------------------------------------------------\033[0m"
  echo "\033[0;36m\033[1mBUILDING $1\033[0m\033[0m  ~  \033[0;90m$2\033[0m"
  echo "\033[0;36m--------------------------------------------------------\033[0m"
}

# UPDATE
task CONFIG @syncify/config
pnpm @config build

# GLUE
task TIMER @syncify/glue
pnpm @glue build

# ANSI
task ANSI @syncify/ansi
pnpm @ansi build

# KILL
task KILL @syncify/kill
pnpm @kill build

# UPDATE
task UPDATE @syncify/update
pnpm @update build

# ACQUIRE
task ACQUIRE @syncify/acquire
pnpm @acquire build

# uWebsockets
task uWebsockets @syncify/uws
pnpm @uws build

# TURNDOWN
task TURNDOWN @syncify/turndown
pnpm @turndown build

# HOT
task HOT @syncify/hot
pnpm @hot build

# JSON
task JSON @syncify/json
pnpm @json build

# TIMER
task TIMER @syncify/timer
pnpm @timer build

# CODEFRAME
task CODEFRAME @syncify/codeframe
pnpm @codeframe build

# CODEGEN
task CODEGEN @syncify/codegen
pnpm @codegen build

# SYNCIFY CLI
task SYNCIFY @syncify/cli
pnpm @cli --minify
