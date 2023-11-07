Rebuild Containers (Ignores cache)

```
docker compose up --build --force-recreate --no-deps
```

## Track mosquitto logs
Connect to mqtt container by terminal
```
mosquitto_sub -t uber/coords
```