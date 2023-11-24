create_network:
	-docker network rm simulator_default taxi_backend_default
	-docker network create shared-network

start-local: create_network
	-cd simulator && make start_simulator_local && cd ..
	-cd taxi_backend && make start_local_taxi_backend