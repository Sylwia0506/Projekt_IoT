from django.test import TestCase
from django.test.utils import override_settings

@override_settings(DATABASES={'default': {'NAME': 'testowa_baza'}})
class MojTest(TestCase):
    def test_cos(self):
        pass
