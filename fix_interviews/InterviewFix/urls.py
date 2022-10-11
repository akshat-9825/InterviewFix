from django.urls import path
from django.core.serializers import serialize
from . import views
from django.contrib import admin

urlpatterns=[
  path('admin/', admin.site.urls),
  path('',views.index),
  path('view_interview/', views.interviews_view),
  path('create_interview/', views.create_interview_entry)
]