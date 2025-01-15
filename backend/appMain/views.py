from typing import Any, Dict
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# from .products import products
from .models import Products, ProductImages, User, UserAddresses, Orders, OrderItems
from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, UserAddressSerializer, OrderSerializer, OrderItemSerializer
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
# from django.contrib.auth.models import User
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
        try:
            self.email_message.send()
            print("Email sent successfully!")
        except Exception as e:
            print(f"Error sending email: {str(e)}")


@api_view(['GET'])
def getRoutes(request):
    return Response('Hello World')


@api_view(['GET'])
@permission_classes([AllowAny]) 
def getProducts(request):
    products = Products.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny]) 
def getProduct(request, pk):
    product = Products.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)
    # serializer = ProductSerializer(product, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
# def addProduct(request):
#         if not request.user.is_authenticated:
#             print(f"Received data: {request.data}")
#             parser_classes = [MultiPartParser, FormParser]
#             serializer = ProductSerializer(data=request.data)
#             if serializer.is_valid:
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             else:
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
def addProduct(request):
    try:
        print(f"Received data: {request.data}")
        print("Received Files:", request.FILES)
        for key, value in request.data.items():
            print(f"{key}: {value} (type: {type(value)})")
        
        parser_classes = [MultiPartParser, FormParser]

        request.data._mutable = True  # Make data mutable (if QueryDict)
        request.data['user'] = request.user.id  # Set the user ID
        request.data._mutable = False
        # data = deepcopy(request.data)  # Copy data to a mutable dictionary
        # data['user'] = request.user.id  # Add user to the data

        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid(): 
            product = serializer.save()
            images = request.FILES.getlist("productImages")
            for image in images:
                ProductImages.objects.create(product=product, image=image)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("Error:", e)
        return Response({"details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editProduct(request, pk):
    try:
        product = Products.objects.get(id=pk)
    except Products.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    print("Incoming data:", request.data)  # Logs form data
    print("Incoming files:", request.FILES)  # Logs uploaded files

    serializer = ProductSerializer(product, data=request.data, partial=True)  # `partial=True` allows partial updates
    if serializer.is_valid():
        product = serializer.save()
        new_images = request.FILES.getlist("productImages")  # Fetch new uploaded files
        for image in new_images:
            ProductImages.objects.create(product=product, image=image)

        images_to_delete = request.data.getlist("deleteImages", [])  # IDs of images to delete
        ProductImages.objects.filter(id__in=images_to_delete, product=product).delete()

        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print("Serializer errors:", serializer.errors)  # Logs validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    try:
        product = Products.objects.get(id=pk)
        product.delete()
        return Response({"details": "Product deleted successfully"}, status=status.HTTP_200_OK)
    except Products.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
            return Response(
                {"detail": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )



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
@permission_classes([AllowAny])
def registerUser(request):
    data = request.data
    print(f"Received data: {data}")
    profile_picture = request.FILES.get('profilePicture', None)
    print(data)
    try:
        # user = User.objects.create(first_name=data['firstName'], last_name=data['lastName'], username=data['email'], email=data['email'], password=make_password(data['password']))
        if User.objects.filter(email=data['email']).exists():
            return Response({'details': 'Try another email, this email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create(
            first_name=data['firstName'], 
            last_name=data['lastName'], 
            username=data['email'], 
            email=data['email'], 
            password=make_password(data['password']), 
            mobile_number=data['mobileNumber'],
            date_of_birth=data['dateOfBirth'],
            profile_picture = profile_picture,
            is_active=False  # User is inactive until email is verified
        )
        UserAddresses.objects.create(
            user=user,
            address_line_1=data['addressLine1'],
            address_line_2=data['addressLine2'],
            city=data['city'],
            state=data['state'],
            country=data['country'],
            pincode=data['pincode'],
        )
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
        email_message.content_subtype = 'html'
        EmailThread(email_message).start()
        # message = {'details' : "Check your mail to verify your mail."}
        # serialize = UserSerializerWithToken(user, many=False) 
        return Response({'details' : "Check your mail to verify your account."}, status=status.HTTP_201_CREATED)
        # return Response(serialize.data)
    except Exception as e:
        print("Error during registration: ", str(e))
        # message = {'details': e}
        # message = {'details': 'Try another email, this email is already registered.'}
        return Response({'details': "Unknown error occured during registration !"}, status=status.HTTP_400_BAD_REQUEST)
        # return Response(message)
    


class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except Exception as identifier:
            user = None
            print(f"Error decoding user: {str(identifier)}")
        if user is not None and generate_token.check_token(user, token):
            user.is_active = True
            user.save()
            # message = {'details': 'Account is Activated...'}
            # return  Response(message, status=status.HTTP_200_OK)
            return render(request, "activateSuccess.html")
        else:
            return render(request, "activateFail.html", {"reason": "Invalid or expired token"})
        


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProfile(request):
    user = request.user
    data = request.data

    try:
        if "mobileNumber" in data:
            user.mobile_number = data['mobileNumber']

        if "password" in data:
            user.set_password(data['password'])

        user.save()
        return Response({'details': "Profile updated successfully!"}, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error Updating Profile: {str(e)}"),
        return Response(
            {'details': "Error Updating Profile."},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def manageAddresses(request):
    user = request.user

    if request.method == 'GET':
        addresses = UserAddresses.objects.filter(user=user)
        serializer = UserAddressSerializer(addresses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        try:
            data = request.data
            new_address = UserAddresses.objects.create(
                user=user,
                address_line_1=data['addressLine1'],
                address_line_2=data['addressLine2'],
                city=data['city'],
                state=data['state'],
                country=data['country'],
                pincode=data['pincode'],
            )
            serializer = UserAddressSerializer(new_address)
            return Response({'details': 'New Address added successfully!',"address": serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print('Error occured: ', e)
            return Response({'details': 'Unable to add New Address at the moment.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # elif request.method == 'PUT':
    #     data = request.data
    #     try:
    #         address = UserAddresses.objects.get(id=data['id'], user=user)
    #         address.address_line_1 = data['addressLine1']
    #         address.address_line_2 = data['addressLine_2']
    #         address.city = data['city']
    #         address.state = data['state']
    #         address.country = data['country']
    #         address.pincode = data['pincode']
    #         address.save()
    #         serializer = UserAddressSerializer(address)
    #         return Response(serializer.data, {'details': 'User Address updated.'},status=status.HTTP_200_OK)
    #     except UserAddresses.DoesNotExist:
    #         return Response({'details': 'User Address not found.'}, status=status.HTTP_404_NOT_FOUND)
        
    
    elif request.method == 'DELETE':
        print("DELETE request data:", request.data)
        # print("Address ID:", address_id)
        try:
            address_id = request.data.get('id')
            address = UserAddresses.objects.get(id=address_id, user=user)
            address.delete()
            return Response({'details': 'User Address deleted.'}, status=status.HTTP_200_OK)
        except UserAddresses.DoesNotExist:
            return Response({'details': 'User Address not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print("Error occurred:", e)
            return Response({'details': 'Unable to delete the Address at the moment.'}, status=status.HTTP_400_BAD_REQUEST)
        



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderHistory(request):
    try:
        user = request.user
        orders = Orders.objects.filter(user=user)
        serializer = OrderSerializer(orders, many=True)
        return Response({'details': "Your Past Orders.", 'orders': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        print("Error generating your past orders: ", e)
        return Response({'details': "Error generating your past orders."},status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderDetail(request, order_id):
    try:
        user = request.user  
        order = get_object_or_404(Orders, order_id=order_id, user=user)
        # order_id = request.query_params.get('order_id')  # Get the order_id from query params
        if not order_id:
            print("Order ID missing")
            return Response({'details': 'Order ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # order = get_object_or_404(Orders, order_id=request.query_params.get('order_id'), user=user)
        # serializer = OrderSerializer(order)
        order_items = OrderItems.objects.filter(order_id=order_id)
        order_serializer = OrderSerializer(order)
        order_items_serializer = OrderItemSerializer(order_items, many=True)
        
        print("Order Details")
        return Response({'details': "Your Order Details.", 'order': order_serializer.data, 'order_items': order_items_serializer.data }, status=status.HTTP_200_OK)
    except Orders.DoesNotExist:
        return Response(
            {'details': 'Order not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        print(f"Error generating details for the specific order: {str(e)}")
        return Response(
            {'details': 'An unexpected error occurred.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


VALID_ORDER_STATUSES = ['processing', 'placed', 'shipped', 'delivered', 'cancelled']

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    user = request.user
    cart_items = request.data.get('cart_items',[])
    delivery_address_id = request.data.get('delivery_address')
    order_date=request.data.get('order_date')

    try:
        delivery_address = UserAddresses.objects.get(id=delivery_address_id, user=user)
    except UserAddresses.DoesNotExist:
        return Response({'error': 'Shipping address not found'}, status=status.HTTP_400_BAD_REQUEST)
    
    sub_total = 0
    order_items = []

    for item in cart_items:
        try:
            product = Products.objects.get(id=item['product_id'])
            total_product_price = product.productPrice * item['quantity']
            order_item = OrderItems(
                product=product,
                quantity=item['quantity'],
                price_at_purchase=product.productPrice,
                total_product_price=total_product_price,
            )
            order_items.append(order_item)
            sub_total += total_product_price
        except Products.DoesNotExist:
            return Response({'error': f'Product {item["product_id"]} not found'}, status=400)
        
    tax = sub_total * 0.15
    shipping_charges = 100 if sub_total >= 15000 else 0
    grand_total = sub_total + tax + shipping_charges

    order = Orders.objects.create(
        user=user,
        delivery_address=delivery_address,
        status='processing',
        subtotal=sub_total, 
        tax=tax,
        shipping_charges=shipping_charges,
        grand_total=grand_total,
        order_date=order_date
    )

    for order_item in order_items:
        order_item.order = order
        order_item.save()

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderStatus(request, order_id):
    try:
        # Retrieve the order
        order = get_object_or_404(Orders, order_id=order_id, user=request.user)

        # Get the new status from the request data
        new_status = request.data.get('status')
        if not new_status:
            return Response({'details': 'Status is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the status is valid
        if new_status not in VALID_ORDER_STATUSES:
            return Response({'details': f'Invalid status. Valid statuses are: {", ".join(VALID_ORDER_STATUSES)}.'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the status
        order.status = new_status
        order.save()

        return Response({'details': 'Order status updated successfully.'}, status=status.HTTP_200_OK)
    except Exception as e:
        print("Error updating order status: ", e)
        return Response({'details': 'Error updating order status.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancelOrder(request):
    try:
        user = request.user
        cart_items=request.data.get('cart_items')  # Pass an empty cart or cart items
        delivery_address = request.data.get('delivery_address', None)  # Address is null or the selected one, since order was not completed
        order_date=request.data.get('order_date')

        sub_total = 0
        order_items = []

        for item in cart_items:
            try:
                product = Products.objects.get(id=item['product_id'])
                total_product_price = product.productPrice * item['quantity']
                order_item = OrderItems(
                    product=product,
                    quantity=item['quantity'],
                    price_at_purchase=product.productPrice,
                    total_product_price=total_product_price,
                )
                order_items.append(order_item)
                sub_total += total_product_price
            except Products.DoesNotExist:
                return Response({'error': f'Product {item["product_id"]} not found'}, status=400)
            
        tax = sub_total * 0.15
        shipping_charges = 100 if sub_total >= 15000 else 0
        grand_total = sub_total + tax + shipping_charges

        order = Orders.objects.create(
            user=user,
            delivery_address=delivery_address,
            status='cancelled',
            subtotal=sub_total, 
            tax=tax,
            shipping_charges=shipping_charges,
            grand_total=grand_total,
            order_date=order_date
        )

        for order_item in order_items:
            order_item.order = order
            order_item.save()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("Error creating cancelled order: ", e)
        return Response({'details': 'Error creating the cancelled order.'}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllOrders(request):
    try:
        orders = Orders.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response({'details': "Successfully Placed Orders.", 'orders': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        print("Error retrieving orders: ", e)
        return Response({'details': "Orders Not Found."},status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllOrderDetails(request, order_id):
    try:
        order = get_object_or_404(Orders, order_id=order_id)
        # order_id = request.query_params.get('order_id')  # Get the order_id from query params
        if not order_id:
            print("Order ID missing")
            return Response({'details': 'Order ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # order = get_object_or_404(Orders, order_id=request.query_params.get('order_id'), user=user)
        # serializer = OrderSerializer(order)
        order_items = OrderItems.objects.filter(order_id=order_id)
        order_serializer = OrderSerializer(order)
        order_items_serializer = OrderItemSerializer(order_items, many=True)
        
        print("Order Details")
        return Response({'details': "Your Order Details.", 'order': order_serializer.data, 'order_items': order_items_serializer.data }, status=status.HTTP_200_OK)
    except Orders.DoesNotExist:
        return Response(
            {'details': 'Order not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        print(f"Error generating details for the specific order: {str(e)}")
        return Response(
            {'details': 'An unexpected error occurred.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )