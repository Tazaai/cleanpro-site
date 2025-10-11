exec > >(tee agent.md) 2>&1
# ⛔ Exit with error if ❌ found in agent.md
grep -q "❌" agent.md && exit 1
#!/bin/bash
# (paste your full verified CleanPro Codox AI Agent script here)
