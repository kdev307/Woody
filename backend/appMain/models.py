from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.

class User(AbstractUser):
    mobile_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='user_profiles/', null=True, blank=True)

    def __str__(self):
        return self.username
    
class UserAddresses(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="userAddresses" ,on_delete=models.CASCADE, null=True)
    address_line_1 = models.CharField(max_length=255, null=True, blank=True)
    address_line_2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    pincode = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return self.username


class Products(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    productName = models.CharField(max_length=255)
    productBrand = models.CharField(max_length=255, null=True, blank=True)
    # productCategory = models.CharField(max_length=150, null=True, blank=True)
    productCategories = models.JSONField(default=list, null=True, blank=True)
    productDescription = models.TextField(null=True, blank=True)
    productSpecifications = models.TextField(null=True, blank=True)
    productReviews = models.TextField(null=True, blank=True)
    productRating = models.FloatField(default=0.0,
        null=True, blank=True)
    productNumReviews = models.IntegerField(null=True, blank=True, default=0)
    productPrice = models.FloatField(default=0.00,
        null=True, blank=True)
    productStockCount = models.IntegerField(null=True, blank=True, default=0)
    createdAT = models.DateTimeField(auto_now_add=True)
    updatedAT = models.DateTimeField(auto_now=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.productName

class ProductImages(models.Model):
    product = models.ForeignKey(Products, related_name="productImages", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products/")
    uploadedAT = models.DateTimeField(auto_now_add=True)
    updatedAT = models.DateTimeField(auto_now=True)
    id = models.AutoField(primary_key=True, editable=False)
