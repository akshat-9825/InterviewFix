from email.policy import default
from random import choices
from secrets import choice
import string
from time import time
from tracemalloc import start
from unittest.util import _MAX_LENGTH
from django.db import models

role_choice = (
    ('I', 'Interviewer'),
    ('C', 'Candidate'),
)

interview_status = (
    ('C', 'Completed'),
    ('P', 'Pending'),
)

# class User(models.Model):
#     id = models.AutoField(primary_key = True)
#     email = models.CharField(max_length = 320)
#     first_name = models.CharField(max_length = 50, null = False)
#     last_name = models.CharField(max_length = 50, null=True ,default='')
#     password = models.CharField(max_length=50)
#     role = models.CharField(max_length = 2, choices = role_choice, default = 'C')

#     def __str__(self):
#         return self.first_name + " " + self.last_name

class Candidate(models.Model):
    id = models.AutoField(primary_key = True)
    email = models.CharField(max_length = 320)
    first_name = models.CharField(max_length = 50, null = False)
    last_name = models.CharField(max_length = 50, null=True)
    password = models.CharField(max_length=50)
    college_name = models.CharField(max_length=100, default='PDPM IIITDMJ')
    # role = models.CharField(max_length = 2, choices = role_choice, default = 'C')

    def __str__(self):
        return str(self.id) + " - " + self.first_name + " " + self.last_name

class Interviewer(models.Model):
    id = models.AutoField(primary_key = True)
    email = models.CharField(max_length = 320)
    first_name = models.CharField(max_length = 50, null = False)
    last_name = models.CharField(max_length = 50, null=True)
    password = models.CharField(max_length=50)
    experience = models.PositiveIntegerField(default=1)

    def __str__(self):
        return str(self.id) + " - " + self.first_name + " " + self.last_name

class Interview(models.Model):
    interview_id = models.AutoField(primary_key = True)
    candidate=models.ForeignKey(Candidate,on_delete=models.CASCADE, default = '1')
    interviewer = models.ForeignKey(Interviewer, on_delete = models.CASCADE, default ='2')
    # user = models.ForeignKey(User, on_delete = models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length = 2,choices = interview_status, default = 'P')

    def __str__(self):
        return str(self.interview_id)
