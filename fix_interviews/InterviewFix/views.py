from datetime import datetime, timezone
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from .models import Candidate, Interviewer, Interview
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
  now = datetime.now()
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
  try:
    candidate_user = Candidate.objects.get(id=candidate_id)
    interviewer_user = Interviewer.objects.get(id=interviewer_id)
  except:
    return JsonResponse({
      "Status":"Unsuccessful"
    })

  st = datetime.fromisoformat(json_data['start_time'][:-1])
  st.strftime('%Y-%m-%d %H:%M:%S')
  
  et = datetime.fromisoformat(json_data['end_time'][:-1])
  et.strftime('%Y-%m-%d %H:%M:%S')

  slot = Interview(start_time=st,end_time=et,interviewer=interviewer_user, candidate = candidate_user)
  slot.save()
  if(checker(candidate_id, interviewer_id)):
    return JsonResponse({
      "Status":"Successful"
    })
  else:
    slot.delete()
    return JsonResponse({
      "Status":"Unsuccessful"
    })

def checker(candidate, interviewer):  
  start_time_list = list([items,1] for items in (Interview.objects.filter(candidate = candidate).values_list('start_time', flat=True)))
  end_time_list = list([items,-1] for items in (Interview.objects.filter(candidate = candidate).values_list('end_time', flat=True)))
  time_list = start_time_list+end_time_list
  time_list.sort()
  print(time_list)
  sum = 0
  for _,i in time_list:
    sum += i
    if(sum>=2):
      return False

  start_time_list = list([items,1] for items in (Interview.objects.filter(interviewer = interviewer).values_list( 'start_time', flat=True)))
  end_time_list = list([items,-1] for items in (Interview.objects.filter(interviewer = interviewer).values_list('end_time', flat=True)))
  time_list = start_time_list+end_time_list
  time_list.sort()
  sum = 0
  for _,i in time_list:
    sum += i
    if(sum>=2):
      return False

  return True

def delete_interview(request):
  json_data = json.loads(request.body) 
  interview_id = json_data['interview_id']
  try:
    interview = Interview.objects.get(interview_id = interview_id)
  except:
    return JsonResponse({
      "Status":"Unsuccessful"
    })
  interview.delete()
  return JsonResponse({
      "Status":"Successful"
    })

def edit_interview(request):
  json_data = json.loads(request.body) 
  interview_id= json_data['interview_id']
  candidate_id = json_data['candidate']
  interviewer_id = json_data['interviewer']
  try:
    interview=Interview.objects.get(interview_id=interview_id)
    candidate_user = Candidate.objects.get(id=candidate_id)
    interviewer_user = Interviewer.objects.get(id=interviewer_id)
  except:
    return JsonResponse({
      "Status":"Unsuccessful"
    }) 
  st = datetime.fromisoformat(json_data['start_time'][:-1])
  st.strftime('%Y-%m-%d %H:%M:%S')
  
  et = datetime.fromisoformat(json_data['end_time'][:-1])
  et.strftime('%Y-%m-%d %H:%M:%S')

  #original details
  original_start_time = interview.start_time
  original_end_time = interview.end_time
  original_interviewer = interview.interviewer
  original_candidate = interview.candidate


  interview.start_time = st
  interview.end_time = et
  interview.interviewer = interviewer_user
  interview.candidate = candidate_user
  interview.save()
  if(checker(candidate_id, interviewer_id)):
    return JsonResponse({
      "Status":"Successful"
    })
  else:
    
    interview.start_time = original_start_time
    interview.end_time = original_end_time
    interview.interviewer = original_interviewer
    interview.candidate = original_candidate
    interview.save()
    return JsonResponse({
      "Status":"Unsuccessful"
    })
