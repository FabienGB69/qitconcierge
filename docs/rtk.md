# RTK — CLI Proxy for LLM Token Reduction

> Sources: [github.com/rtk-ai/rtk](https://github.com/rtk-ai/rtk) · [skillsllm.com/skill/rtk](https://skillsllm.com/skill/rtk)

RTK is a high-performance CLI proxy that reduces LLM token consumption by 60–90% by filtering and compressing command outputs before they reach your AI assistant's context window.

- Single Rust binary, zero dependencies
- Sub-10ms overhead per command
- 100+ supported commands across multiple ecosystems

## Installation

```bash
# Homebrew (recommended)
brew install rtk

# Quick install (Linux/macOS)
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh

# Cargo
cargo install --git https://github.com/rtk-ai/rtk
```

Pre-built binaries are available for macOS (x86_64 & ARM64), Linux (x86_64 musl & ARM64 gnu), and Windows (x86_64 MSVC).

## Quick Start

```bash
rtk init -g                    # Claude Code / Copilot (default)
rtk init -g --gemini           # Gemini CLI
rtk init -g --codex            # Codex (OpenAI)
rtk init --agent cursor        # Cursor
rtk init --agent windsurf      # Windsurf
rtk init --agent cline         # Cline / Roo Code
rtk init --agent kilocode      # Kilo Code
rtk init --agent antigravity   # Google Antigravity
rtk init --agent hermes        # Hermes
```

After initialization, restart your AI tool. Commands are automatically rewritten (e.g. `git status` → `rtk git status`).

## How It Works

RTK applies four optimization strategies:

1. **Smart Filtering** — Removes noise, comments, whitespace, and boilerplate
2. **Grouping** — Aggregates similar items (files by directory, errors by type)
3. **Truncation** — Preserves relevant context while eliminating redundancy
4. **Deduplication** — Collapses repeated log entries with occurrence counts

### Token Savings (30-minute session)

| Operation | Frequency | Standard | RTK | Savings |
|-----------|-----------|----------|-----|---------|
| `ls` / `tree` | 10× | 2,000 | 400 | -80% |
| `cat` / `read` | 20× | 40,000 | 12,000 | -70% |
| `grep` / `rg` | 8× | 16,000 | 3,200 | -80% |
| `cargo test` | 5× | 25,000 | 2,500 | -90% |
| **Total** | — | **~118,000** | **~23,900** | **-80%** |

## Supported Commands

### File Operations

```bash
rtk ls .                       # Token-optimized directory tree
rtk read file.rs               # Smart file reading
rtk read file.rs -l aggressive # Signatures only
rtk smart file.rs              # 2-line code summary
rtk find "*.rs" .              # Compact find results
rtk grep "pattern" .           # Grouped search results
rtk diff file1 file2           # Condensed diff
```

### Git Operations

```bash
rtk git status                 # Compact status
rtk git log -n 10              # One-line commits
rtk git diff                   # Condensed diff
rtk git add                    # → "ok"
rtk git commit -m "msg"        # → "ok abc1234"
rtk git push                   # → "ok main"
rtk git pull                   # → "ok 3 files +10 -2"
```

### GitHub CLI

```bash
rtk gh pr list                 # Compact PR listing
rtk gh pr view 42              # PR details + checks
rtk gh issue list              # Compact issue listing
rtk gh run list                # Workflow run status
```

### Testing

```bash
rtk jest                       # Failures only
rtk vitest                     # Failures only
rtk playwright test            # E2E results (failures only)
rtk pytest                     # -90%
rtk go test                    # -90%
rtk cargo test                 # -90%
rtk rake test                  # -90%
rtk rspec                      # -60%+
rtk test <cmd>                 # Generic test wrapper
```

### Build & Linting

```bash
rtk lint                       # ESLint grouped by rule/file
rtk tsc                        # TypeScript errors grouped
rtk next build                 # Next.js build compact
rtk prettier --check .         # Files needing formatting
rtk cargo build                # -80%
rtk cargo clippy               # -80%
rtk ruff check                 # -80%
rtk golangci-lint run          # -85%
rtk rubocop                    # -60%+
```

### Package Managers

```bash
rtk pnpm list                  # Compact dependency tree
rtk pip list                   # Python packages
rtk pip outdated               # Outdated packages
rtk bundle install             # Ruby gems
rtk prisma generate            # Schema generation
```

### Cloud & Infrastructure

```bash
rtk aws sts get-caller-identity   # One-line identity
rtk aws ec2 describe-instances    # Compact instance list
rtk aws lambda list-functions     # Name/runtime/memory
rtk docker ps                     # Compact container list
rtk kubectl pods                  # Compact pod list
rtk kubectl logs <pod>            # Deduplicated logs
```

### Data & Analytics

```bash
rtk json config.json           # Structure without values
rtk deps                       # Dependencies summary
rtk env -f AWS                 # Filtered env vars
rtk log app.log                # Deduplicated logs
rtk curl <url>                 # Truncate + save full output
rtk summary <command>          # Heuristic summary
rtk proxy <command>            # Raw passthrough + tracking
```

### Analytics

```bash
rtk gain                       # Summary statistics
rtk gain --graph               # ASCII graph (last 30 days)
rtk gain --history             # Recent command history
rtk gain --daily               # Day-by-day breakdown
rtk gain --all --format json   # JSON export

rtk discover                   # Find optimization opportunities
rtk session                    # Show adoption across sessions
```

## Global Flags

| Flag | Description |
|------|-------------|
| `-u`, `--ultra-compact` | ASCII icons, inline format (extra savings) |
| `-v`, `--verbose` | Increase verbosity (`-v`, `-vv`, `-vvv`) |

## Supported AI Tools

| Tool | Install command | Method |
|------|-----------------|--------|
| Claude Code | `rtk init -g` | PreToolUse hook (bash) |
| GitHub Copilot (VS Code) | `rtk init -g --copilot` | PreToolUse hook |
| Cursor | `rtk init -g --agent cursor` | preToolUse hook |
| Gemini CLI | `rtk init -g --gemini` | BeforeTool hook |
| Codex | `rtk init -g --codex` | AGENTS.md + RTK.md |
| Windsurf | `rtk init --agent windsurf` | .windsurfrules |
| Cline / Roo Code | `rtk init --agent cline` | .clinerules |
| OpenCode | `rtk init -g --opencode` | Plugin TS |
| Hermes | `rtk init --agent hermes` | Python plugin |
| Kilo Code | `rtk init --agent kilocode` | .kilocode/rules |
| Google Antigravity | `rtk init --agent antigravity` | .agents/rules |

## Configuration

Create `~/.config/rtk/config.toml` (macOS: `~/Library/Application Support/rtk/config.toml`):

```toml
[hooks]
exclude_commands = ["curl", "playwright"]  # Skip rewrite for these

[tee]
enabled = true      # Save raw output on failure
mode = "failures"   # "failures", "always", or "never"
```

When commands fail, RTK saves the full unfiltered output:

```
FAILED: 2/15 tests
[full output: ~/.local/share/rtk/tee/1707753600_cargo_test.log]
```

## Important Limitation for Claude Code

Claude Code's built-in tools (Read, Grep, Glob) bypass the Bash hook and will not auto-benefit from RTK optimization. Use shell commands or call RTK explicitly (`rtk read`, `rtk grep`, `rtk find`) for those workflows.

## Windows Support

### Recommended: WSL (Full Support)

```bash
# Inside WSL
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh
rtk init -g
```

### Native Windows (Limited Support)

RTK filters work but auto-rewrite hooks fall back to CLAUDE.md injection mode. Download `rtk-x86_64-pc-windows-msvc.zip` from releases, add `rtk.exe` to PATH, then run `rtk init -g`.

## Telemetry

Telemetry is **disabled by default** and requires explicit opt-in. Data collected (if enabled): anonymized device hash, RTK version, OS/arch, command counts and token savings. Source code, file paths, secrets, and personal data are never collected.

```bash
rtk telemetry status           # Check consent state
rtk telemetry enable           # Give consent
rtk telemetry disable          # Withdraw consent
rtk telemetry forget           # Delete all local data
```

Override via environment: `export RTK_TELEMETRY_DISABLED=1`

## Uninstall

```bash
rtk init -g --uninstall        # Remove hook, RTK.md, settings
cargo uninstall rtk             # Remove binary (if installed via cargo)
brew uninstall rtk              # Remove binary (if installed via homebrew)
```

## Resources

- Full user guide: https://www.rtk-ai.app/guide
- GitHub: https://github.com/rtk-ai/rtk
- SkillsLLM: https://skillsllm.com/skill/rtk
