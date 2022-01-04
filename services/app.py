import datetime
from werkzeug.exceptions import (HTTPException, InternalServerError,
                                 default_exceptions)
from flask import Flask
from flask import g
from flask import redirect
from flask import request
from flask import session
from flask import json
from flask import url_for, abort, render_template, flash
from functools import wraps
from hashlib import md5
from peewee import *
from config import config

params = config()
SECRET_KEY = 'hin6bab8ge25*r=x&amp;+5$0kn=-#log$pt^#@vrqjld!^2ci@g*b'


app = Flask(__name__)
app.config.from_object(__name__)

database = PostgresqlDatabase(**params)


class BaseModel(Model):
    class Meta:
        database = database


class Budget(BaseModel):
    transactionId = AutoField(null=True)
    accountId = CharField()
    categoryType = CharField()
    category = CharField()
    amount = FloatField()
    date = DateTimeField(null=True)
    note = CharField(null=True)

    def budgets():
        return (Budget
                .select())


def create_tables():
    print('create tables')
    with database:
        database.create_tables([Budget])


def get_object_or_404(model, *expressions):
    try:
        return model.get(*expressions)
    except model.DoesNotExist:
        abort(404)


@app.before_request
def before_request():
    g.db = database
    g.db.connect()


@app.after_request
def after_request(response):
    g.db.close()
    return response


@app.route("/", methods=["GET", "POST"])
def hello():
    return "Welcome to Python Flask."


@app.route("/add", methods=["GET", "POST"])
def addBudget():

    data = request.get_json()
    print(data)
    if request.method == 'POST':
      row1 = Budget(accountId="eMf8kHHMLUbilhlZAE8YzpWbzBj1",
                    categoryType="bill",
                    category="Consumers",
                    amount=100)
      row2 = Budget(accountId="eMf8kHHMLUbilhlZAE8YzpWbzBj1",
                    categoryType="bill",
                    category="Consumers",
                    amount=100)

      Budget.bulk_create([row1, row2]
                         # accountId=data.get('accountId'),
                         # categoryType=data.get('categoryType'),
                         # category=data.get('category'),
                         # amount=data.get('amount'),
                         # date=datetime.datetime,
                         # note=data.get('note')
                         )
    return json_response({'success': 'budget found'}, 200)


@app.route("/budget", methods=["GET", "POST"])
def budget():
    budget = Budget.select()
    if budget:
        return json_response(budget('data'))
    else:
        return json_response({'error': 'budget not found'}, 404)


def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-categoryType': 'application/json'})


if __name__ == '__main__':
    # Run the app server on localhost: 443
    create_tables()
    app.run(host='localhost', port=5000)
