<<<<<<< HEAD
# Generated by Django 4.2.1 on 2023-07-06 05:08
=======
# Generated by Django 4.2.1 on 2023-07-05 21:20
>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=80)),
                ('duration', models.FloatField(blank=True, null=True)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('course_image', models.ImageField(upload_to='courses/images')),
                ('is_approved', models.BooleanField(default=False)),
                ('description', models.CharField(blank=True, null=True)),
                ('level', models.CharField(choices=[('beginner', 'Beginner'), ('expert', 'Expert'), ('intermediate', 'Intermediate')], max_length=20)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses_app.category')),
                ('instructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Section',
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
                ("section", models.CharField(max_length=100)),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sections",
                        to="courses_app.course",
                    ),
                ),
=======
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section', models.CharField(max_length=100)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='courses_app.course')),
>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video', models.FileField(upload_to='video/videos')),
                ('title', models.CharField(max_length=150)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='courses_app.course')),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='courses_app.section')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField()),
                ('comment', models.TextField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='courses_app.course')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Quiz',
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
                ("title", models.CharField(max_length=255)),
                ("instructions", models.TextField()),
                ("start_time", models.TimeField()),
                ("end_time", models.TimeField()),
                ("deadline_days", models.PositiveIntegerField()),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="course_quizzes",
                        to="courses_app.course",
                    ),
                ),
                (
                    "section",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="course_quizzes",
                        to="courses_app.section",
                    ),
                ),
=======
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('instructions', models.TextField()),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('deadline_days', models.PositiveIntegerField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='course_quizzes', to='courses_app.course')),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='course_quizzes', to='courses_app.section')),
>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f
            ],
        ),
        migrations.CreateModel(
            name='Enrollment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_enrolled', models.DateTimeField(auto_now_add=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses_app.course')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='course',
            name='students',
            field=models.ManyToManyField(default=[], related_name='enrollments', through='courses_app.Enrollment', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Cart',
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
                (
                    "courses",
                    models.ManyToManyField(
                        related_name="carts", to="courses_app.course"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="cart_items",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
=======
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courses', models.ManyToManyField(related_name='carts', to='courses_app.course')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f
            ],
        ),
        migrations.CreateModel(
            name='Assignment',
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
                ("title", models.CharField(max_length=255)),
                ("instructions", models.TextField()),
                ("deadline_days", models.PositiveIntegerField()),
                (
                    "file",
                    models.FileField(blank=True, null=True, upload_to="assignments/"),
                ),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="Assignment",
                        to="courses_app.course",
                    ),
                ),
                (
                    "section",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="Assignment",
                        to="courses_app.section",
                    ),
                ),
=======
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('instructions', models.TextField()),
                ('deadline_days', models.PositiveIntegerField()),
                ('file', models.FileField(blank=True, null=True, upload_to='assignments/')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Assignment', to='courses_app.course')),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Assignment', to='courses_app.section')),
>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f
            ],
        ),
    ]
