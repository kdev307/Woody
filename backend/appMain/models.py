from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils import timezone

# Create your models here.

class User(AbstractUser):
    mobile_number = models.CharField(max_length=25, unique=True, null=True, blank=True)
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
    # productReviews = models.TextField(null=True, blank=True)
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
    
    def update_review_stats(self):
        reviews = self.productReviews.all()
        self.productNumReviews = reviews.count() or 0
        self.productRating = reviews.aggregate(average_rating=models.Avg('rating'))['average_rating'] or 0.0
        self.save()

class ProductImages(models.Model):
    product = models.ForeignKey(Products, related_name="productImages", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products/")
    uploadedAT = models.DateTimeField(auto_now_add=True)
    updatedAT = models.DateTimeField(auto_now=True)
    id = models.AutoField(primary_key=True, editable=False)



class Orders(models.Model):
    STATUS_CHOICES = [('placed', 'Placed'),
        ('processing', 'Processing'),
        ('dispatched', 'Dispatched'),
        ('delivered', 'Delivered'),
        ('canceled', 'Canceled'),]
    
    order_id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='processing')
    # total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    tracking_number = models.CharField(max_length=255, blank=True, null=True)
    delivery_address = models.ForeignKey(UserAddresses, on_delete=models.SET_NULL, null=True, blank=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_charges = models.DecimalField(max_digits=10, decimal_places=2)
    grand_total = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.order_id} - {self.status}"
    
    def updated_tracking_number(self):
        if self.status=='dispatched' or self.status=='Dispatched' and not self.tracking_number:
            self.tracking_number = f"TRK-OD-{self.order_id}-{timezone.now().strftime('%Y%m%d%H%M%S')}"

    @property
    def total_order_items(self):
        return sum(item.quantity for item in self.order_items.all())
    
    # @property
    # def total_price(self):
    #     return sum(item.total_price for item in self.order_items.all())
    

class OrderItems(models.Model):
    order = models.ForeignKey(Orders, related_name='order_items', on_delete=models.CASCADE) 
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)
    total_product_price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def total_price(self):
        return self.quantity * self.price_at_purchase

    def __str__(self):
        return f"{self.product.product_name} - {self.quantity} pcs"
    

class Review(models.Model):
    product = models.ForeignKey(Products, related_name='productReviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='user_reviews', on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    review_title = models.TextField(blank=True, null=True)
    review_comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_verified_purchase = models.BooleanField(default=False)

    def __str__(self):
        return f"Review by {self.user.username} for {self.product.productName}"

    def save(self, *args, **kwargs):
        # Check if the user has purchased this product before saving the review
        purchased_items = OrderItems.objects.filter(
            order__user=self.user, 
            product=self.product, 
            order__status__in=['delivered', 'dispatched']
        )
        self.is_verified_purchase = purchased_items.exists()
        super().save(*args, **kwargs)
        self.product.update_review_stats()

        def delete(self, *args, **kwargs):
            product = self.product
            super().delete(*args, **kwargs)
            product.update_review_stats() 

