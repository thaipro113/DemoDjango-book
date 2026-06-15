import django_filters
from book.models import Book


class BookFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(field_name='title', lookup_expr='icontains')
    author = django_filters.CharFilter(field_name='author', lookup_expr='icontains')
    price = django_filters.NumberFilter(field_name='price')
    quantity = django_filters.NumberFilter(field_name='quantity')

    class Meta:
        model = Book
        fields = [
            'title',
            'author',
            'price',
            'quantity',
        ]
