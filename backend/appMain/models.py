from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Products(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
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
