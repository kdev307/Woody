from typing import Any, Dict
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# from .products import products
from .models import Products
from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# for sending mail and generate token
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .utils import TokenGenerator,generate_token
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View
import threading

# Create your views here.

class EmailThread(threading.Thread):
    def __init__(self, email_message):
        self.email_message = email_message
        threading.Thread.__init__(self)

    def run(self):
        self.email_message.send()


@api_view(['GET'])
def getRoutes(request):
    return Response('Hello World')


@api_view(['GET'])
def getProducts(request):
    products = Products.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Products.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    print(f"Received data: {data}")
    print(data)
    try:
        # user = User.objects.create(first_name=data['firstName'], last_name=data['lastName'], username=data['email'], email=data['email'], password=make_password(data['password']))
        user = User.objects.create(first_name=data['firstName'], last_name=data['lastName'], username=data['email'], email=data['email'], password=make_password(data['password']), is_active=False)

        # generate token for sending mail
        email_subject = "Activate Your Account"
        message = render_to_string(
            "activate.html",
            {
            'user' : user,
            'domain' : 'localhost:8000',
            'uid' : urlsafe_base64_encode(force_bytes(user.pk)),
            'token' : generate_token.make_token(user)
            }
        )
        # print(message)
        email_message=EmailMessage(email_subject,message,settings.EMAIL_HOST_USER,[data['email']])
        EmailThread(email_message).start()
        # message = {'details' : "Check your mail to verify your mail."}
        # serialize = UserSerializerWithToken(user, many=False) 
        return Response({'details' : "Check your mail to verify your account."}, status=status.HTTP_201_CREATED)
        # return Response(serialize.data)
    except Exception as e:
        print("Error during registration: ", str(e))
        # message = {'details': e}
        # message = {'details': 'Try another email, this email is already registered.'}
        return Response({'details': "Try another email, this email is already registered."}, status=status.HTTP_400_BAD_REQUEST)
        # return Response(message)
    


class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except Exception as identifier:
            user = None
        if user is not None and generate_token.check_token(user, token):
            user.is_active = True
            user.save()
            # message = {'details': 'Account is Activated...'}
            # return  Response(message, status=status.HTTP_200_OK)
            return render(request, "activateSuccess.html")
        else:
            return render(request, "activateFail.html")
