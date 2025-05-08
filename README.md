# mcp-servers

```console
$ bun install
```

```json
{
  "mcpServers": {
    "samari": {
      "command": "bun",
      "args": [
        "run",
        "/path/to/mcp-servers",
        "samari"
      ]
    },
    "todoist": {
      "command": "bun",
      "args": [
        "run",
        "/path/to/mcp-servers",
        "todoist"
      ],
      "env": {
        "TODOIST_API_TOKEN": "<TODOIST_API_TOKEN>"
      }
    },
    "utilities": {
      "command": "bun",
      "args": [
        "run",
        "/path/to/mcp-servers",
        "utilities"
      ]
    }
  }
}
```
