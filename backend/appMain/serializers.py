from rest_framework import serializers
from .models import Products, ProductImages, User, UserAddresses, OrderItems, Orders, Review
# from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
import re

class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    productImages = ProductImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Products
        fields = '__all__'
        extra_kwargs = {
            'productBrand': {'required': False},
            'productName': {'required': False},
            'productDescription': {'required': False},
            'productSpecifications': {'required': False},
            'productReviews': {'required': False},
            'productRating': {'required': False},
            'productNumReviews': {'required': False},
            'productPrice': {'required': False},
            'productStockCount': {'required': False},
            'productCategories': {'required': False},
        }

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddresses
        fields = [
            'id',
            'address_line_1',
            'address_line_2',
            'city',
            'state',
            'country',
            'pincode',
            'user_id'
        ]


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    addresses = UserAddressSerializer(many=True, source='userAddresses', read_only=True)  # Add this field


    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token', 'mobile_number', 
                'date_of_birth', 'addresses', 'profile_picture']

    def get_name(self, obj):
        firstname = obj.first_name
        lastname = obj.last_name
        name = firstname + ' ' + lastname
        if name == '':
            name = obj.email[:5]
        return name

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff or obj.is_superuser or False




class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token', 'mobile_number', 
                'date_of_birth', 'addresses', 'profile_picture']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.productName')
    product_price = serializers.DecimalField(source='product.productPrice', max_digits=10, decimal_places=2)
    product_image = serializers.SerializerMethodField()
    # user = serializers.SerializerMethodField()

    class Meta:
        model = OrderItems
        fields = ['product_name', 'quantity', 'product_price', 'product_image', 'total_product_price']

    def get_product_image(self, obj):
        product_images = ProductImages.objects.filter(product=obj.product)
        product_images = sorted(product_images, key=lambda img: int(re.search(r'\d+', img.image.name).group(0)))
        if product_images:
            return product_images[0].image.url
        return None
    
    # def get_total_price(self, obj):
    #     return obj.quantity * obj.product.productPrice


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    user = serializers.CharField(source='user.username')
    # user_name = serializers.SerializerMethodField()
    grand_total = serializers.DecimalField(max_digits=10, decimal_places=2)
    delivery_address = serializers.SerializerMethodField()

    class Meta:
        model = Orders
        fields = ['order_id', 'user', 'order_date', 'status', 'tracking_number', 'delivery_address', 'subtotal', 'tax', 'shipping_charges', 'grand_total', 'order_items']

    def get_delivery_address(self, obj):
        address = obj.delivery_address
        if address:
            return {
                'address_line_1': address.address_line_1,
                'address_line_2': address.address_line_2,
                'city': address.city,
                'state': address.state,
                'country': address.country,
                'pincode': address.pincode
            }
        return None
    
    def get_total_price(self, obj):
        return sum(item.total_price for item in obj.order_items.all())


class ReviewSerializer(serializers.ModelSerializer):
    # user_name = serializers.CharField(source='user.username', read_only=True)  # Add user name
    user_id = serializers.IntegerField(source='user.id', read_only=True)  # Add user id
    user_name = serializers.SerializerMethodField() 
    user_profile = serializers.SerializerMethodField()
    # created_at_formatted = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", source='created_at', read_only=True)  # Optional
    created_at_formatted = serializers.SerializerMethodField()
    updated_at_formatted = serializers.SerializerMethodField()
    
    product = ProductSerializer(read_only=True)
    product_image = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = ['id','rating','review_title','review_comment','is_verified_purchase','created_at_formatted', 'user_id', 'user_name', 'user_profile', 'product', 'product_image', 'updated_at_formatted']

    def get_user_name(self, obj):
        if obj.user:  # Ensure user exists
            return obj.user.get_full_name() or obj.user.username
        return "Anonymous"  # Default if no user is linked

    def get_user_profile(self, obj):
        if obj.user and obj.user.profile_picture:  # Ensure user and profile picture exist
            return obj.user.profile_picture.url
        return "/static/images/user_profiles/default-avatar.png"  # Default avatar
    
    def get_created_at_formatted(self, obj):
        # Format the datetime in the desired format
        if obj.created_at:
            return obj.created_at.strftime("%B %d, %Y | %I:%M:%S %p")
        return ""
    
    def get_updated_at_formatted(self, obj):
        # Format the datetime in the desired format
        if obj.updated_at:
            return obj.updated_at.strftime("%B %d, %Y | %I:%M:%S %p")
        return ""
    
    def get_product_image(self, obj):
        product_images = ProductImages.objects.filter(product=obj.product)
        product_images = sorted(product_images, key=lambda img: int(re.search(r'\d+', img.image.name).group(0)))
        if product_images:
            return product_images[0].image.url
        return None
    