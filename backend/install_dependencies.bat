@echo off
echo Installation des dépendances DimaClean...

pip install django==5.2.4
pip install djangorestframework==3.16.0
pip install django-cors-headers==4.7.0
pip install pandas==2.3.1
pip install numpy==2.3.1
pip install pillow==11.3.0
pip install python-multipart==0.0.20
pip install reportlab==4.0.7
pip install fpdf2==2.7.6
pip install python-dotenv==1.0.0

echo.
echo Installation terminée !
echo Vous pouvez maintenant lancer: python manage.py runserver
pause