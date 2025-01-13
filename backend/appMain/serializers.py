from rest_framework import serializers
from .models import Products, ProductImages, User, UserAddresses, OrderItems, Orders
# from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

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
        return obj.is_staff or obj.is_superuser




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

    class Meta:
        model = OrderItems
        fields = ['product_name', 'quantity', 'product_price', 'product_image', 'total_product_price']

    def get_product_image(self, obj):
        product_image = ProductImages.objects.filter(product=obj.product).first()
        if product_image:
            return product_image.image.url
        return None
    
    def get_total_price(self, obj):
        return obj.quantity * obj.product.productPrice


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    user = serializers.CharField(source='user.username')
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


