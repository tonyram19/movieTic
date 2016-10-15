from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
import stripe

stripe.api_key = "sk_test_kBOe1hC7tQ4pw8y0pybKuuIn"

class UserList(APIView):

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            customer = stripe.Customer.create(description=serializer.validated_data['email'], source=serializer.validated_data['card_token'])
            print serializer.validated_data["customer_token"]
            serializer.validated_data["customer_token"] = customer["id"]
            print serializer.validated_data["customer_token"]
            serializer.save()
            #stripe.Charge.create(amount=20, currency="usd", source=serializer.data['stripe_token'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
