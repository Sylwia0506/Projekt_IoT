## Rebuild Containers (Ignores cache)

```
docker compose up --build --force-recreate --no-deps
```

## Track mosquitto logs
Connect to mqtt container by terminal
```
mosquitto_sub -t uber/coords
```

## Subscribe to topic with Two-Way Auth Enabled
```
mosquitto_sub -h localhost -p 8443 --cafile /certs/ca.pem --cert /certs/broker.pem --key /certs/broker.key -t uber/coords
```

## Mosquitto Docs

- [mosquitto.org](https://mosquitto.org/man/mosquitto-conf-5.html)