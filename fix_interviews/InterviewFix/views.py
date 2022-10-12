from datetime import datetime, timedelta, timezone
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
  new_data=[]
  for entry in data:
    interviewer_id = entry.get('interviewer_id')
    candidate_id = entry.get('candidate_id')
    interviewer_name = Interviewer.objects.get(id=interviewer_id)
    interviewer = interviewer_name.first_name + " " + interviewer_name.last_name
    candidate_name= Candidate.objects.get(id=candidate_id)
    candidate = candidate_name.first_name + " " + candidate_name.last_name
    entry['interviewer_id'] = interviewer
    entry['candidate_id'] = candidate
    new_data.append(entry)
  data=new_data
  print(data)
  return JsonResponse(data, safe=False)

def interviewers_view(request):
  data = list(Interviewer.objects.values())
  return JsonResponse(data, safe=False)

def candidate_view(request):
  data = list(Candidate.objects.values())
  return JsonResponse(data, safe=False)

@csrf_exempt
def create_interview_entry(request):
  json_data = json.loads(request.body) 
  candidate_id = json_data['candidate']
  interviewer_id = json_data['interviewer']
  
  print("=====================================================")
  # print(interview_id)
  print(candidate_id)
  print(interviewer_id)
  print("=====================================================")
  try:
    candidate_user = Candidate.objects.get(id=candidate_id)
    interviewer_user = Interviewer.objects.get(id=interviewer_id)
  except:
    return JsonResponse({
      "Status":"Unsuccessful"
    })

  st = datetime.fromisoformat(json_data['start_time'][:-1])
  st.strftime('%Y-%m-%d %H:%M:%S')
  st = st + timedelta(hours=5, minutes=30)
  #2022-11-12 21:00:00
  et = datetime.fromisoformat(json_data['end_time'][:-1])
  et.strftime('%Y-%m-%d %H:%M:%S')
  et = et + timedelta(hours=5, minutes=30)
  print("========================================          ", st, "          ", et)
  slot = Interview(start_time=st,end_time=et,interviewer=interviewer_user, candidate = candidate_user)
  slot.save()
  print("========================================          ", st, "          ", et)
  if(checker(candidate_id, interviewer_id)):
    print("========================================", "SUCESSSSSSSSSSSSSSS")
    return JsonResponse({
      "Status":"Successful",
    }, status=200)
  else:
    print("========================================", "Else Check")
    slot.delete()
    return JsonResponse({
      "Status":"Unsuccessful"
    }, status=400)

def checker(candidate, interviewer):  
  start_time_list = list([items,1] for items in (Interview.objects.filter(candidate = candidate).values_list('start_time', flat=True)))
  end_time_list = list([items,-1] for items in (Interview.objects.filter(candidate = candidate).values_list('end_time', flat=True)))
  time_list = start_time_list+end_time_list
  time_list.sort()
  #print(time_list)
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

@csrf_exempt
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

@csrf_exempt
def edit_interview(request):
  json_data = json.loads(request.body) 
  interview_id= json_data['interview_id']
  candidate_id = json_data['candidate']
  interviewer_id = json_data['interviewer']
  print("=====================================================")
  print(interview_id)
  print(candidate_id)
  print(interviewer_id)
  print("=====================================================")
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
  st = st + timedelta(hours=5, minutes=30)
  et = datetime.fromisoformat(json_data['end_time'][:-1])
  et.strftime('%Y-%m-%d %H:%M:%S')
  et = et + timedelta(hours=5, minutes=30)
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
    }, status=200)
  else:
    
    interview.start_time = original_start_time
    interview.end_time = original_end_time
    interview.interviewer = original_interviewer
    interview.candidate = original_candidate
    interview.save()
    return JsonResponse({
      "Status":"Unsuccessful"
    }, status=400)
