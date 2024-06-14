from django.db import models

# Create your models here.
class Player(models.Model): 
    name = models.CharField(max_length=100)
    info = models.TextField()
    id = models.AutoField(primary_key=True)


class Prop(models.Model): 
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    description = models.TextField()
    id = models.AutoField(primary_key=True)
    probability_score = models.FloatField()
    prev_ten = models.FloatField()





