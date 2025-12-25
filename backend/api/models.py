from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length = 100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add = True)
    author = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'notes')

    def __str__(self):
        return self.title
    
    #class Note created a table in the database with fields for title, content, 
    #created_at timestamp, and a foreign key relationship to the User model as author.

    #foreign key is specifying the relationship between Note and User models.
    #on_delete=models.CASCADE means that if a User is deleted, all their associated Notes will also
    #be deleted.
    #related_name='notes' allows accessing all notes of a user via user.notes.all().
