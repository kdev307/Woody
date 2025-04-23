from appMain import views
from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView)

urlpatterns = [
    path('', views.getRoutes, name="getRoutes"),
    path('products/', views.getProducts, name="getProducts"),
    path('product/<str:pk>/', views.getProduct, name="getProduct"),
    path('products/add/', views.addProduct, name="addProduct"),
    path('product/edit/<str:pk>/', views.editProduct, name="editProduct",),
    path('product/delete/<str:pk>/', views.deleteProduct, name="deleteProduct",),
    path('users/', views.getUsers, name='getUsers'),
    path('users/register/', views.registerUser, name="register"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name='getUserProfile'),
    path('users/update-profile/', views.updateProfile, name='updateProfile'),
    path('users/manage-addresses/', views.manageAddresses, name='manageAddresses'),
    path('users/orders/checkout/', views.checkout, name="checkout"),
    path('users/orders/<int:order_id>/status/', views.updateOrderStatus, name='update-order-status'),
    path('users/orders/order-history/', views.getOrderHistory, name='order-history'),
    path('users/orders/<int:order_id>/order-details/', views.getOrderDetail, name='order-details'),
    path('users/orders/cancel/', views.cancelOrder, name='cancel_order'),
    path('user/<str:pk>/reviews/', views.getUserReviews, name='user-reviews'),
    path('users/product/<str:pk>/review/add/', views.addReview, name='add-review'),
    path('users/product/<str:productPK>/review/<str:reviewPK>/edit/', views.editReview, name='edit-review'),
    path('users/review/<str:pk>/delete/', views.deleteReview, name='delete-review'),
    path('admin/orders/all/', views.getAllOrders, name='all-orders'),
    path('admin/order/<int:order_id>/order-details/', views.getAllOrderDetails, name='all-order-details'),
    path('admin/orders/<int:order_id>/dispatch/', views.dispatchOrder, name='admin-dispatch-order'),
    path('activate/<uidb64>/<token>', views.ActivateAccountView.as_view(), name='activate')
]