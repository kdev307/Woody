from rest_framework import serializers
from .models import Products, ProductImages
from django.contrib.auth.models import User
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


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

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
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
