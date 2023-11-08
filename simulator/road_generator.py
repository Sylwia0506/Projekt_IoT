import random

import osmnx as ox
import networkx as nx

filepath = "./bialystok.graphml"
G = ox.load_graphml(filepath)
random_range = G.number_of_nodes()
w = 'travel_time'


def generate_route(current_point=None, destination_point=None):
    if current_point is not None:
        starting_point = ox.nearest_nodes(G, current_point[0], current_point[1])
    else:
        starting_point = list(G)[random.randint(-random_range, random_range)]

    if destination_point is not None:
        end_point = ox.nearest_nodes(G, destination_point[0], destination_point[1])
    else:
        end_point = list(G)[random.randint(-random_range, random_range)]

    return nx.shortest_path(G, starting_point, end_point, weight=w)
