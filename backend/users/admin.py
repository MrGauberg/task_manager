from django.contrib import admin

from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ("username", "first_name", "last_name", "email", "is_staff")
    search_fields = ("username", "first_name", "last_name", "email")
    list_filter = ("is_staff", "is_active")
    ordering = ("username",)
