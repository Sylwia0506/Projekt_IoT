import pytest
import simulator.road_generator as rd
import networkx as nx


def validate_routes(*routes):
    for i, route in enumerate(routes, start=1):
        if not is_valid_route(route):
            print(f"Validation Error - Test {i}: The route is not valid in the graph.")
        else:
            print(f"Validation Passed - Test {i}: The route is valid in the graph.")


def is_valid_route(route):
    return nx.has_path(rd.Gp, source=route[0], target=route[-1])


@pytest.fixture
def random_start_point():
    return None


@pytest.fixture
def random_end_point():
    return None


@pytest.fixture
def custom_start_point():
    return 53.1333, 23.1643


@pytest.fixture
def custom_end_point():
    return 53.1500, 23.1800


def test_generate_init_route():
    init_route = rd.generate_init_route()
    assert init_route is not None
    assert is_valid_route(init_route)


def test_generate_route_with_custom_points(custom_start_point, custom_end_point):
    route = rd.generate_route(current_point=custom_start_point, destination_point=custom_end_point)
    assert route is not None
    assert is_valid_route(route)


def test_get_next_point_coordinates():
    num_points_to_generate = 5
    for _ in range(num_points_to_generate):
        next_point = rd.get_next_point_coordinates()
        assert next_point is not None


def test_validate_routes():
    init_route = rd.generate_init_route()
    custom_route = rd.generate_route(current_point=(53.1333, 23.1643), destination_point=(53.1500, 23.1800))
    assert is_valid_route(init_route)
    assert is_valid_route(custom_route)
