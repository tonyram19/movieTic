from django.conf.urls import url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from users import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<id>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^transactions/$', views.TransactionList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
