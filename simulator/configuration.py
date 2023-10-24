from logger import Logger
from scheduler import Scheduler


class Configuration:
    def __init__(self, log_file_name, log_level, interval_seconds, task_method):
        self.logger = Logger(log_file_name, log_level)
        self.scheduler = Scheduler(interval_seconds, task_method, self.logger)