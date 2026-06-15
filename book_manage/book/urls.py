
from django.urls import path
from book.views import BookList, BookDetail, RegisterUser

urlpatterns = [
    path('book', BookList.as_view(), name='book-list'),
    path('book/<int:pk>', BookDetail.as_view(), name='book-detail'),
    path('register', RegisterUser.as_view(), name='register'),
]