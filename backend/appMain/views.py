from typing import Any, Dict
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Products, ProductImages, User, UserAddresses, Orders, OrderItems, Review
from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, UserAddressSerializer, OrderSerializer, OrderItemSerializer, ReviewSerializer
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework import status
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.hashers import make_password
from django.db import transaction
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .utils import TokenGenerator,generate_token
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError, force_str
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
    try:
        product = Products.objects.get(id=pk)
        reviews = Review.objects.filter(product=product)
        productSerializer = ProductSerializer(product, many=False)
        reviewSerializer = ReviewSerializer(reviews, many=True)
        productData = productSerializer.data
        productData['productReviews'] = reviewSerializer.data
        # serializer = ProductSerializer(product, many=True)
        return Response(productData, status=status.HTTP_200_OK)
    except Products.DoesNotExist:
        return Response({"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print("Error:", e)
        return Response({"details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def addProduct(request):
    try:
        print(f"Received data: {request.data}")
        print("Received Files:", request.FILES)
        for key, value in request.data.items():
            print(f"{key}: {value} (type: {type(value)})")
        
        parser_classes = [MultiPartParser, FormParser]

        request.data._mutable = True 
        request.data['user'] = request.user.id
        request.data._mutable = False

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

    print("Incoming data:", request.data)
    print("Incoming files:", request.FILES)

    serializer = ProductSerializer(product, data=request.data, partial=True)
    if serializer.is_valid():
        product = serializer.save()
        new_images = request.FILES.getlist("productImages")
        for image in new_images:
            ProductImages.objects.create(product=product, image=image)

        images_to_delete = request.data.getlist("deleteImages", [])
        ProductImages.objects.filter(id__in=images_to_delete, product=product).delete()

        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print("Serializer errors:", serializer.errors)
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
        if User.objects.filter(email=data['email']).exists():
            return Response({'details': 'Try another email, this email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(mobile_number=data['mobileNumber']).exists():
            return Response({'details': 'Try another number, this number is already registered.'}, status=status.HTTP_400_BAD_REQUEST)
        if data['password'] != data['confirmPassword']:
            return Response(
                {'details': "Passwords do not match."},
                status=status.HTTP_400_BAD_REQUEST
            )
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
            # uid = force_text(urlsafe_base64_decode(uidb64))
            uid = force_str(urlsafe_base64_decode(uidb64))
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

    old_password = data.get('oldPassword')
    new_password = data.get('newPassword')
    confirm_password = data.get('confirmPassword')


    try:
        if "mobileNumber" in data:
            if user.mobile_number == data["mobileNumber"]:
                return Response(
                    {'details': "Cannot update the mobile number with the existing one."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                user.mobile_number = data['mobileNumber']


        if "oldPassword" in data and "newPassword" in data and "confirmPassword" in data:
            old_password = data['oldPassword']
            new_password = data['newPassword']
            confirm_password = data['confirmPassword']

            if not user.check_password(old_password):
                return Response(
                    {'details': "Current password is incorrect."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            
            if old_password == new_password or old_password == confirm_password:
                return Response(
                    {'details': "Password already exists."},
                    status=status.HTTP_400_BAD_REQUEST,
                )


            if new_password != confirm_password:
                return Response(
                    {'details': "New password and confirm password do not match."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                if not user.check_password(old_password):
                    return Response({'message': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

            except ValidationError as e:
                return Response(
                    {'details': f"Password validation error: {', '.join(e)}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user.set_password(new_password)

        user.save()

        update_session_auth_hash(request, user)
        
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

        send_order_status_email(order, 'status_update')

        return Response({'details': 'Order status updated successfully.'}, status=status.HTTP_200_OK)
    except Orders.DoesNotExist:
        return Response({'details': 'Order not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'details': f'Error updating order status: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
    
def send_order_status_email(order, event_type):
    """Send an email notification based on the event type (dispatch or status update)."""
    try:
        # Get the order items
        order_items = order.order_items.all()

        # Check the event type and render the appropriate template
        if event_type == 'dispatched':
            # Event is dispatch
            subject = f"Your Order #{order.order_id} Has Been Dispatched"
            html_message = render_to_string(
                'orderDispatched.html', {
                    'first_name': order.user.first_name,
                    'order_id': order.order_id,
                    'tracking_number': order.tracking_number,
                    'order_items': order_items,
                }
            )
        elif event_type == 'status_update':
            # Event is status update
            subject = f"Your Order #{order.order_id} Status Has Been Updated"
            html_message = render_to_string(
                'orderStatusUpdate.html', {
                    'first_name': order.user.first_name,
                    'order_id': order.order_id,
                    'current_status': order.status,
                    'order_items': order_items.all(),
                }
            )
        else:
            raise ValueError("Invalid event type")

        # Generate plain text version by stripping the HTML tags
        # plain_message = strip_tags(html_message)

        # Create the email message
        email_message = EmailMessage(
            subject, html_message, settings.EMAIL_HOST_USER, [order.user.email]
        )
        email_message.content_subtype = 'html'
        # email_message.attach_alternative(html_message, "text/html")

        # Send the email in a separate thread to avoid blocking the main thread
        EmailThread(email_message).start()

        return Response({'details': f'Order email for {event_type} sent successfully.'}, status=status.HTTP_200_OK)

    except Exception as e:
        print("Error sending order email:", e)
        return Response({'details': 'Error sending order email.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        return Response({'details': "All Order Details.", 'order': order_serializer.data, 'order_items': order_items_serializer.data }, status=status.HTTP_200_OK)
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

@api_view(['POST'])
@permission_classes([IsAdminUser])
def dispatchOrder(request, order_id):
    try:
        with transaction.atomic():
            order = Orders.objects.get(order_id=order_id)
            if order.status == 'dispatched':
                return Response({"details": "Order already dispatched."}, status=status.HTTP_400_BAD_REQUEST)

            order.status='dispatched'
            order.updated_tracking_number()
            order.save()
            send_order_status_email(order, 'dispatched')

            for item in order.order_items.all():
                product = item.product
                if product.productStockCount >= item.quantity:
                    product.productStockCount -= item.quantity
                    product.save()
                else:
                    return Response({"details": f"Not enough stock for {product.productName}"}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"details": "Order dispatched successfully."}, status=status.HTTP_200_OK)
    except Orders.DoesNotExist:
        return Response({"details": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"details": f"Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserReviews(request, pk):
    try:
        # user = request.user
        user = User.objects.get(id=pk)
        reviews = Review.objects.filter(user=user).select_related('product')
        # for review in reviews:
        #     print(review.product) 
        serializer = ReviewSerializer(reviews, many=True)
        # print(serializer.data) 
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'detail':'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f'Error: {str(e)}')
        return Response({'detail':'Cannot fetch user reviews'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addReview(request, pk):
    try:
        product = Products.objects.get(id=pk)

        user = request.user
        purchased_items = OrderItems.objects.filter(
            order__user=user,
            product=product,
            order__status__in=['dispatched', 'delivered']
        )
        
        review_title = request.data.get('review_title')
        review_comment = request.data.get('review_comment')
        rating = request.data.get('rating')

        if rating is None or rating < 0 or rating > 5:
            return Response(
                {"detail": "Please provide a valid rating between 0 and 5."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        review = Review.objects.create(
            product=product,
            user=user,
            review_title=review_title,
            review_comment=review_comment,
            rating=rating,
            is_verified_purchase=purchased_items.exists()
        )
        product.update_review_stats()

        return Response({"detail": "Review added successfully."}, status=status.HTTP_201_CREATED
        )
        
    except Products.DoesNotExist:
        return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response({"detail": f"Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editReview(request, productPK, reviewPK):
    try:
        user=request.user
        product = Products.objects.get(id=productPK)
        review = Review.objects.get(id=reviewPK, product=product, user=user)
        serializer = ReviewSerializer(review, data=request.data, partial=True)
        review.save()
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Review.DoesNotExist:
        return Response({"error": "Review not found"}, status=status.HTTP_404_NOT_FOUND)
    except Products.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteReview(request, pk):
    try:
        review = Review.objects.get(id=pk)
        product = Products.objects.get(id=review.product_id)
        review.delete()
        product.update_review_stats()
        return Response({"details": "Review deleted successfully"}, status=status.HTTP_200_OK)
    except Review.DoesNotExist:
        return Response({"error": "Review not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
            return Response(
                {"detail": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )