<<<<<<< HEAD
# Generated by Django 4.2.1 on 2023-07-06 05:08
=======
# Generated by Django 4.2.1 on 2023-07-05 21:20
>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AssignmentSubmission',
            fields=[
                ('submission_id', models.AutoField(primary_key=True, serialize=False)),
                ('submission_date', models.DateTimeField()),
                ('submitted_file', models.FileField(upload_to='assignments/')),
                ('grade', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('is_completed', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('certificate_id', models.AutoField(primary_key=True, serialize=False)),
                ('issue_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='QuizOption',
            fields=[
<<<<<<< HEAD
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("option_text", models.CharField(max_length=255)),
                ("is_correct", models.BooleanField(default=False)),
=======
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option_text', models.CharField(max_length=255)),
                ('is_correct', models.BooleanField(default=False)),
>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f
            ],
        ),
        migrations.CreateModel(
            name='QuizQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_text', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='QuizSubmission',
            fields=[
                ('submission_id', models.AutoField(primary_key=True, serialize=False)),
                ('submission_date', models.DateTimeField()),
                ('score', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('is_completed', models.BooleanField(default=False)),
            ],
        ),
    ]
