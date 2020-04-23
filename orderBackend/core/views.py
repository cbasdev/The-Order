from django.shortcuts import render, HttpResponse

# Create your views here.
def home(request):
    html_response = "<h1>HOME</h1>"
    return HttpResponse(html_response)

def login(request):
    html_response = "<h1>Login</h1>"
    return HttpResponse(html_response)