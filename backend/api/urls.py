from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreateView.as_view(), name = 'note-list'),
    path('notes/delete/<int:pk>/', views.NoteDeleteView.as_view(), name = 'delete-note'), #pk is primary key of the note to be deleted    
]