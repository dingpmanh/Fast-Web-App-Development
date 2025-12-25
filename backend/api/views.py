from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

class NoteListCreateView(generics.ListCreateAPIView): # View for listing and creating notes

    # For all generic views, as long as  we specify queryset, serializer_class, and 
    # permission_classes, the basic functionality is handled by DRF.
    # If we want custom behavior, we can override methods like get_queryset and perform_create.
    # We'll have to look at django rest framework documentation to see what methods are available for overriding.

    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] #Only authenticated users can access this view

    def get_queryset(self): #Get notes for the logged-in user
        user = self.request.user #Get the currently logged-in user
        return Note.objects.filter(author=user) #Return notes authored by this user
    

    # When we pass different data to a serializer, it will tell us if the data is valid or not, 
    # based on the fields that we have declared in the model.
    def perform_create(self, serializer): 
        if serializer.is_valid(): # Manually check if the data is valid
            # If yes, save the serializer, which means creating a new note with the valid data.
            # The thing in parentheses is passing the extra field 'author' that is not provided 
            # by the user.
            # Since the author field is read-only, it won't be set directly by the user input, so
            # here we are setting it manually to the currently logged-in user.
            serializer.save(author = self.request.user) 
        else:
            print(serializer.errors)

class NoteDeleteView(generics.DestroyAPIView): # View for deleting a note
    serializer_class = NoteSerializer 
    permission_classes = [IsAuthenticated]

    def get_queryset(self): # Override get_queryset to ensure users can only delete their own notes
        user = self.request.user
        return Note.objects.filter(author = user)


class CreateUserView(generics.CreateAPIView): # View for user registration
    queryset = User.objects.all() # Here is a list of all user objects to make sure no duplicated users when creating a new one
    serializer_class = UserSerializer # Tell this view what kind of data to expect (usrname, password)
    permission_classes = [AllowAny] # Allow any user (authenticated or not) to access this view
