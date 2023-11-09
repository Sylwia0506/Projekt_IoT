import random

import osmnx as ox
import networkx as nx

filepath = "./bialystok.graphml"
G = ox.load_graphml(filepath)
Gp = ox.project_graph(G, to_latlong=True)
random_range = Gp.number_of_nodes()
w = 'travel_time'


def generate_route(current_point=None, destination_point=None):
    if current_point is not None:
        starting_point = ox.nearest_nodes(Gp, current_point[0], current_point[1])
    else:
        starting_point = list(Gp)[random.randint(-random_range, random_range)]

    if destination_point is not None:
        end_point = ox.nearest_nodes(Gp, destination_point[0], destination_point[1])
    else:
        end_point = list(Gp)[random.randint(-random_range, random_range)]

    return nx.shortest_path(Gp, starting_point, end_point, weight=w)


def generate_init_route():
    return generate_route()


route = generate_init_route()
index = -1


def get_long_lat(point_index):
    return Gp.nodes[point_index]["x"], Gp.nodes[point_index]["y"]


def get_next_point_coordinates():
    global index, route
    index += 1
    if index == len(route) - 1:
        route = generate_route(current_point=get_long_lat(route[index]))
        index = 1
    return get_long_lat(route[index])
