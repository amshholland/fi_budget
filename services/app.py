from werkzeug.exceptions import (HTTPException, InternalServerError,
                                 default_exceptions)
from flask import Flask
from flask import g
from flask import redirect
from functools import partial
from peewee import *
from flask_cors import CORS
from flask import request
from playhouse.shortcuts import model_to_dict, dict_to_model
from flask import session
from flask import json
from flask import url_for, abort, render_template, flash, Response
from functools import wraps
from hashlib import md5
from config import config


params = config()
SECRET_KEY = 'hin6bab8ge25*r=x&amp;+5$0kn=-#log$pt^#@vrqjld!^2ci@g*b'


app = Flask(__name__)
CORS(app)
app.config.from_object(__name__)

database = PostgresqlDatabase(**params)

MoneyField = partial(DecimalField, decimal_places=2)


class BaseModel(Model):
    class Meta:
        database = database


class Budget(BaseModel):
    budgetId = AutoField(null=True)
    accountId = CharField()
    categoryType = CharField()
    category = CharField()
    amount = MoneyField()
    budgetMonth = CharField()
    date = CharField()

    def budgets():
        return (Budget
                .selectAll())


class Transaction(BaseModel):
    transactionId = AutoField(null=True)
    accountId = CharField()
    category = CharField()
    amount = MoneyField()
    date = CharField()
    budgetMonth = CharField()
    note = CharField()

    def transactions():
        return (Transaction
                .selectAll())


def create_tables():
    print('create tables')
    with database:
        database.create_tables([Budget, Transaction])


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


@app.route("/")
def hello():
    return "Welcome to Python Flask."


@app.route("/budget/<accountId>")
def getBudgetsForAccount(accountId):
    try:
        query = list((Budget.select().where(
            Budget.accountId == accountId)).dicts())
        return json_response(query, 200)
    except:
        return json_response({'fail': 'budget not found'}, 400)


@app.route("/budget/add", methods=["GET", "POST"])
def addBudgetForAccount():
    data = request.get_json()

    if request.method == 'POST':
        query = Budget.insert_many(data)
        query.execute()
    return json_response({'success': 'budget found'}, 200)


@app.route("/budget/<budgetId>")
def getBudgetByBudgetId(budgetId):
    try:
        query = list((Budget.select().where(
            Budget.budgetId == budgetId)).dicts())
        return json_response(query, 200)
    except:
        return json_response({'fail': budgetId}, 400)


@app.route("/budget/delete/<budgetId>")
def deleteBudgetByBudgetId(budgetId):
    try:
        query = Budget.get(Budget.budgetId == budgetId)
        query.delete_instance()
        return json_response('deleted', 200)
    except:
        return json_response({'fail': 'budget not found'}, 400)


@app.route("/budget/edit/<budgetId>")
def editExistingBudget(row):
    print(row)
    try:
        query = Budget.get(Budget.budgetId == budgetId)
        query.save(row)
        return json_response('updated', 200)
    except:
        return json_response({'fail': 'budget not updated'}, 400)


@app.route("/budget/<accountId>/summary", methods=["GET", "POST"])
def getBudgetSummary(accountId):
    try:
        bills = Budget.select(fn.SUM(Budget.amount)).where(
            Budget.categoryType == "bill")
        return json_response(bills, 200)
    except:
        return json_response({'fail': accountId}, 400)

@app.route("/transactions/<accountId>")
def getTransactionsForAccount(accountId):
    try:
        query = list((Transaction.select().where(
            Transaction.accountId == accountId)).dicts())
        return json_response(query, 200)
    except:
        return json_response({'fail': 'Transaction not found'}, 400)


@app.route("/transactions/add", methods=["GET", "POST"])
def addTransactionsForAccount():
    data = request.get_json()

    if request.method == 'POST':
        query = Budget.insert_many(data)
        query.execute()
    return json_response({'success': 'budget found'}, 200)

@app.route("/transaction/<transactionId>")
def getTransactionByTransactionId(transactionId):
    try:
        query = list((Transaction.select().where(
            Transaction.transactionId == transactionId)).dicts())
        return json_response(query, 200)
    except:
        return json_response({'fail': transactionId}, 400)


@app.route("/transactions/delete/<transactionId>")
def deleteTransaction(transactionId):
    try:
        query = Transaction.get(Transaction.transactionId == transactionId)
        query.delete_instance()
        return json_response('deleted', 200)
    except:
        return json_response({'fail': 'budget not found'}, 400)


@app.route("/transaction/edit/<transactionId>")
def editExistingTransaction(row):
    print(row)
    try:
        query = Transaction.get(Transaction.transactionId == transactionId)
        query.save(row)
        return json_response('updated', 200)
    except:
        return json_response({'fail': 'budget not updated'}, 400)


@app.route("/transactions/<accountId>/summary", methods=["GET", "POST"])
def getTransactionsSummary(accountId):
    try:
        bills = Transaction.select(fn.SUM(Transaction.amount)).where(
            Transaction.categoryType == "bill")
        return json_response(bills, 200)
    except:
        return json_response({'fail': accountId}, 400)


def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-categoryType': 'application/json'})


if __name__ == '__main__':
    # Run the app server on localhost: 443
    create_tables()
    app.run(host='localhost', port=5000)
