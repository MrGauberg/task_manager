FROM python:3.10

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt --no-cache-dir

RUN python manage.py collectstatic --noinput

VOLUME /app/staticfiles

CMD ["gunicorn", "--bind", "0.0.0.0:9000", "core.wsgi"]