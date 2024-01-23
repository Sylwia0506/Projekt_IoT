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
