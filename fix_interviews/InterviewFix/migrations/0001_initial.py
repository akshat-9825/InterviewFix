# Generated by Django 4.1.2 on 2022-10-11 19:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Candidate",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("email", models.CharField(max_length=320)),
                ("first_name", models.CharField(max_length=50)),
                ("last_name", models.CharField(max_length=50, null=True)),
                ("password", models.CharField(max_length=50)),
                (
                    "college_name",
                    models.CharField(default="PDPM IIITDMJ", max_length=100),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Interviewer",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("email", models.CharField(max_length=320)),
                ("first_name", models.CharField(max_length=50)),
                ("last_name", models.CharField(max_length=50, null=True)),
                ("password", models.CharField(max_length=50)),
                ("experience", models.PositiveIntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name="Interview",
            fields=[
                ("interview_id", models.AutoField(primary_key=True, serialize=False)),
                ("start_time", models.DateTimeField()),
                ("end_time", models.DateTimeField()),
                (
                    "status",
                    models.CharField(
                        choices=[("C", "Completed"), ("P", "Pending")],
                        default="P",
                        max_length=2,
                    ),
                ),
                (
                    "candidate",
                    models.ForeignKey(
                        default="1",
                        on_delete=django.db.models.deletion.CASCADE,
                        to="InterviewFix.candidate",
                    ),
                ),
                (
                    "interviewer",
                    models.ForeignKey(
                        default="2",
                        on_delete=django.db.models.deletion.CASCADE,
                        to="InterviewFix.interviewer",
                    ),
                ),
            ],
        ),
    ]
