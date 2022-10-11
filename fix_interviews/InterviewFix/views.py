from datetime import datetime, timezone
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from .models import User, Interview
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
  now = datetime.datetime.now()
    # convert to string
  html = "Time is {}".format(now)
    # return response
  return JsonResponse({
    "Status": html
  })

def interviews_view(request):
  data = list(Interview.objects.values())
  return JsonResponse(data, safe=False)

@csrf_exempt
def create_interview_entry(request):
  json_data = json.loads(request.body) 
  candidate_id = json_data['candidate']
  interviewer_id = json_data['interviewer']
  candidate_user = User.objects.get(id=candidate_id)
  interviewer_user = User.objects.get(id=interviewer_id)

  st = datetime.fromisoformat(json_data['start_time'][:-1])
  st.strftime('%Y-%m-%d %H:%M:%S')
  
  et = datetime.fromisoformat(json_data['end_time'][:-1])
  et.strftime('%Y-%m-%d %H:%M:%S')

  interview_slot = Interview(start_time=st,end_time=et,user=interviewer_user)
  candidate_slot = Interview(start_time=st,end_time=et,user=candidate_user)
  interview_slot.save()
  candidate_slot.save()
  if(checker(interviewer_id) and checker(candidate_id)):
    return JsonResponse({
      "Status":"Successful"
    })

  interview_slot.delete()
  candidate_slot.delete()
  return JsonResponse({
    "Status":"Unsuccessful"
  })


def delete_interview(request):
  json_data = json.loads(request.body) 
  interview_id = json_data['interview']


def checker(candidate):  
  start_time_list = list([items,1] for items in (Interview.objects.filter(user_id = candidate).values_list( 'start_time', flat=True)))
  end_time_list = list([items,-1] for items in (Interview.objects.filter(user_id = candidate).values_list('end_time', flat=True)))
  time_list = start_time_list+end_time_list
  time_list.sort()
  sum = 0
  for _,i in time_list:
    sum += i
    if(sum>=2):
      return False
  return True
      

  
  
  
