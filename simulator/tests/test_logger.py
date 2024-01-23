import pytest
import logging
import os
from simulator.logger import Logger


@pytest.fixture
def log_file_name(tmpdir):
    return str(tmpdir.join("test_log_file.log"))


def test_logger_creation(log_file_name):
    logger = Logger(log_file_name)
    assert isinstance(logger.logger, logging.Logger)


def test_log_messages(log_file_name, capsys):
    logger = Logger(log_file_name)

    logger.debug("Debug message")
    logger.info("Info message")
    logger.warning("Warning message")

    captured = capsys.readouterr()

    with open(log_file_name, 'r') as log_file:
        content = log_file.read()
        assert "Debug message" in content
        assert "Info message" in content
        assert "Warning message" in content

    assert "Debug message" in captured.out
    assert "Info message" in captured.out
    assert "Warning message" in captured.out


def test_log_levels(log_file_name, capsys):
    logger = Logger(log_file_name)

    logger.debug("Debug message")
    logger.info("Info message")
    logger.warning("Warning message")
    logger.error("Error message")
    logger.critical("Critical message")

    captured = capsys.readouterr()

    with open(log_file_name, 'r') as log_file:
        content = log_file.read()
        assert "Debug message" in content
        assert "Info message" in content
        assert "Warning message" in content
        assert "Error message" in content
        assert "Critical message" in content

    assert "Debug message" in captured.out
    assert "Info message" in captured.out
    assert "Warning message" in captured.out
    assert "Error message" in captured.out
    assert "Critical message" in captured.out


def test_logger_file_content(log_file_name):
    logger = Logger(log_file_name)
    logger.info("Test message")

    with open(log_file_name, 'r') as log_file:
        content = log_file.read()
        assert "Test message" in content