from django.contrib import admin
from .models import Candidate,Interviewer, Interview

# Register your models here.
# admin.site.register(User)
admin.site.register(Interview)
admin.site.register(Candidate)
admin.site.register(Interviewer)