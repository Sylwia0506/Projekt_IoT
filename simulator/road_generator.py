import random

import osmnx as ox
import networkx as nx

filepath = "./bialystok.graphml"
G = ox.load_graphml(filepath)


def generate_routes(number_of_routes):
    w = 'travel_time'
    routes = list()
    random_range = G.number_of_nodes()
    for i in range(number_of_routes):
        orig, dest = list(G)[random.randint(-random_range, random_range)], list(G)[random.randint(-random_range, random_range)]
        try:
            routes.append(nx.shortest_path(G, orig, dest, weight=w))
        except:
            pass
    return routes
