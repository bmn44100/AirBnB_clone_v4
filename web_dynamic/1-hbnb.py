#!/usr/bin/python3
"""
Flask web app
"""
from flask import Flask, render_template, url_for
from models import storage
import uuid

app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


@app.teardown_appcontext
def teardown_db(exception):
    """
    close storage
    """
    storage.close()


@app.route('/1-hbnb')
def hbnb_filters(the_id=None):
    """
    HBNB api for flask application
    """
    state_objects = storage.all('State').values()
    states = dict([state.name, state] for state in state_objects)
    hbnb_amenities = storage.all('Amenity').values()
    hbnb_places = storage.all('Place').values()
    hbnb_users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    return render_template('1-hbnb.html',
                           states=states,
                           amens=hbnb_amenities,
                           places=hbnb_places,
                           users=hbnb_users, cache_id=uuid.uuid4())

if __name__ == "__main__":
    """
    Flask web App
    """
    app.run(host=host, port=port)

