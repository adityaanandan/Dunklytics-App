from .models import * 
from rest_framework import serializers
class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('name', 'info', 'id')

class PropSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Prop
        fields = ('player', 'description', 'id', 'probability_score', 'prev_ten')
