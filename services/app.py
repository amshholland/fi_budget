import datetime
from werkzeug.exceptions import (HTTPException, InternalServerError,
                                 default_exceptions)
from flask import Flask
from flask import g
from flask import redirect
from flask import request
from flask import session
from flask import url_for, abort, render_template, flash
from functools import wraps
from hashlib import md5
from peewee import *
from config import config

params = config()

app = Flask(__name__)
app.config.from_object(__name__)

database = PostgresqlDatabase(**params)

class BaseModel(Model):
  class Meta:
    database = database


class Expense(BaseModel):
  transactionId = CharField()
  accountId = CharField()
  category = CharField()
  amount = FloatField()
  date = DateField()
  note = CharField()

  def expenses():
    return (Expense
            .select()
            .where(accountId == accountId))


class Income(BaseModel):
  transactionId = CharField()
  accountId = CharField()
  category = CharField()
  amount = FloatField()
  date = DateField()
  note = CharField()

  def incomes():
    return (Income
            .select()
            .where(accountId == accountId))


class Bill(BaseModel):
  transactionId = CharField()
  accountId = CharField()
  category = CharField()
  amount = FloatField()
  date = DateField()
  note = CharField()

  def bills():
    return (Bill
            .select()
            .where(accountId == accountId))


def create_tables():
  with database:
    database.create_tables([Expense, Income, Bill])


def object_list(template_name, qr, var_name='object_list', **kwargs):
    kwargs.update(
        page=int(request.args.get('page', 1)),
        pages=qr.count() / 20 + 1)
    kwargs[var_name] = qr.paginate(kwargs['page'])
    return render_template(template_name, **kwargs)


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


def errorhandler(e):
  """Handle error"""
  if not isinstance(e, HTTPException):
    e = InternalServerError()
  return apology(e.name, e.code)


for code in default_exceptions:
  app.errorhandler(code)(errorhandler)


@ app.route("/customize", methods=["GET", "POST"])
def customize():
    """Customize budget"""

    id = session["user_id"]

    if request.method == "POST":

        day = request.form.get('day')
        update = cursor.execute(
            "UPDATE users SET budget_day = ? WHERE id = ?", (day, id))

        income = "income"
        in_type = request.form.get('in_type')
        in_amount = request.form.get('in_amount')
        in_date = request.form.get('in_date')

        income_insert = cursor.execute(
            "INSERT INTO budget_tbl (id, ie, category, amount, date) VALUES (?, ?, ?, ?, ?)", (id, income, in_type, in_amount, in_date))
        conn.commit(update, income_insert)

        return render_template("index.php")

    else:
        # Direct user to customize page
        return render_template("customize.php", id=id)


@ app.route("/test")
def customized():
    """Customize budget"""

    # Direct user to customize page
    return render_template("test.php")


@ app.route("/add", methods=["GET", "POST"])
def add():
    """Add to budget"""

    return render_template("register.html")


@ app.route("/budget", methods=["GET", "POST"])
def budget():
    """Complete monthly budget"""

    return render_template("register.html")


@ app.route("/net worth", methods=["GET", "POST"])
def net_worth():
    """Displays timeline of net worth"""

    return render_template("register.html")


@ app.route("/goals", methods=["GET", "POST"])
def goals():
    """Determine monthly, yearly, and ultimate financial goals"""

    return render_template("goals.html")


if __name__ == '__main__':
    # Run the app server on localhost: 443
  create_tables()
  app.run('localhost', 5000)
