## Run Container
docker compose up -d

## Rebuild Containers (Ignores cache)

```
docker compose up --build --force-recreate --no-deps
```