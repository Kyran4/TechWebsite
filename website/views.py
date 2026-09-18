from urllib import request

from django.shortcuts import render
from django.templatetags.static import static
from django.contrib import messages
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from .forms import UsernameChangeForm
from django.contrib.auth.views import PasswordChangeView
from django.urls import reverse_lazy

class CustomPasswordChangeView(PasswordChangeView):
    template_name = "registration/password_change_form.html"
    success_url = reverse_lazy("home")


def index_view(request):
    banner_items = [
    {
        "image": static("website/media/Laptop.jpg"),
        "alt": "Premium Laptop",
        "title": "Ultra Performance Laptop",
        "specs": [
            "Intel Core i9 Processor",
            "32GB DDR5 RAM",
            "1TB NVMe SSD Storage",
            "RTX 4080 Graphics Card",
        ],
    },
    {
        "image": static("website/media/Headset.jpg"),
        "alt": "Noise-Cancelling Headphones",
        "title": "Noise-Cancelling Headphones",
        "specs": [
            "Active Noise Cancellation",
            "30 Hours Battery Life",
            "Bluetooth 5.2 Connectivity",
            "360° Surround Sound",
        ],
    },
    {
        "image": static("website/media/Watch.jpg"),
        "alt": "Smart Fitness Watch",
        "title": "Smart Fitness Watch",
        "specs": [
            "Heart Rate Monitoring",
            "GPS Tracking",
            "Water Resistant",
            "Customizable Watch Faces",
        ],
    },
    {
        "image": static("website/media/Mouse.jpg"),
        "alt": "RGB Gaming Mouse",
        "title": "RGB Gaming Mouse",
        "specs": [
            "16,000 DPI Sensor",
            "Customizable RGB Lighting",
            "Ergonomic Design",
            "Programmable Buttons",
        ],
    },
    {
        "image": static("website/media/Keyboard.jpg"),
        "alt": "Mechanical Keyboard",
        "title": "Mechanical Keyboard",
        "specs": [
            "Cherry MX Switches",
            "RGB Backlighting",
            "Customizable Macros",
            "Durable Build Quality",
        ],
    },
    {
        "image": static("website/media/Speaker.jpg"),
        "alt": "AI Smart Speaker",
        "title": "AI Smart Speaker",
        "specs": [
            "Voice Assistant Integration",
            "High-Fidelity Sound",
            "Smart Home Control",
            "Multi-Room Audio Support",
        ],
    },
]

    return render(request, "website/index.html", {"banner_items": banner_items})

def about_view(request):
    return render(request, "website/about.html")

def contact_view(request):
    return render(request, "website/contact.html")


def gallery_view(request):
    return render(request, "website/gallery.html")

def shop_view(request):
    return render(request, "website/shop.html")

def sale_item_view(request):
    return render(request, "website/sale-item.html")

@login_required
def checkout_view(request):
    return render(request, "website/checkout.html")


def signup(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("accounts/login")
    else:
        form = UserCreationForm()
    return render(request, "registration/signup.html", {"form": form})

@login_required
def edit_account(request):
    if request.method == "POST":
        form = UsernameChangeForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect("home")
    else:
        form = UsernameChangeForm(instance=request.user)

    return render(request, "accounts/edit_account.html", {"form": form})


def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, "Logged in successfully.")
            return redirect("home")  # change to wherever you want
        else:
            messages.error(request, "Invalid username or password.")
    else:
        form = AuthenticationForm()

    return render(request, "accounts/login.html", {"form": form})


def logout_view(request):
    logout(request)
    messages.success(request, "You have been logged out.")
    return redirect("home")