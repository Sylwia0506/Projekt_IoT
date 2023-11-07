from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.interval import IntervalTrigger


class Scheduler:
    def __init__(self, interval_seconds, task_method, logger, client):
        self.interval_seconds = interval_seconds
        self.task_method = task_method
        self.logger = logger
        self.scheduler = BlockingScheduler()
        self.scheduler.add_job(self.run_task, IntervalTrigger(seconds=self.interval_seconds), args=[client])
        self.scheduler.start()

    def run_task(self, client):
        self.logger.debug(self.task_method(client))
