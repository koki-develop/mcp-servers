# mcp-servers

```console
$ bun install
```

```json
{
  "mcpServers": {
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
    }
  }
}
```
