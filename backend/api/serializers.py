from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}} #Ensure that password is not returned in responses

    def create(self, validated_data): #creates user with the fields provided, django will check if all fields are valid
        print(validated_data)
        user = User.objects.create_user(**validated_data) #double asterisks to unpack dictionary
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}} #Ensure that author is not set directly