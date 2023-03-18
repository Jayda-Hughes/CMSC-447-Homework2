from flask import Flask, jsonify, request 
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import sqlite3
from flask import g
from flask_cors import CORS

app= Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class cmscdatabase(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        Name = db.Column(db.String(100))
        Points = db.Column(db.Integer)


        def __init__(self, id, Name, Points):
                self.id=id
                self.Name=Name
                self.Points=Points
                

class cmscSchema(ma.Schema):
        class Meta:
                fields=('id','Name','Points')

cmsc_schema= cmscSchema()
cmsc_schema= cmscSchema(many=True)


@app.route('/get', methods= ['GET'])
def get_cmscdatabase():
        all_cmsc = cmsc.query.all()
        results = cmsc_schema.dump(all_cmsc)
        return jsonify(results)
        
@app.route('/get/<id>', methods= ['GET'])
def post_details(id):
       cmscdatabase=cmsc.query.get(id)
       return cmsc_schema.jsonify(cmscdatabase)

@app.route('/add/', methods = ['POST'])
def add_cmsc():
        id= request.json['id']
        Name = request.json['Name']
        Points = request.json['Points']


        cmscdatabase= cmsc(id, Name, Points)
        db.session.add(cmscdatabase)
        db.session.commit()
        return cmsc_schema.jsonify(cmscdatabase)

@app.route('/update/<id>/', methods=['PUT'])
def update_cmsc(id):
        cmscdatabase=cmsc.query.get(id)

        Name=request.json['Name']
        Points= request.json['Points']

        cmscdatabase.Name=Name
        cmscdatabase.Points=Points

        db.session.commit()
        return cmsc_schema.jsonify(cmscdatabase)
@app.route('/createuser/<id>/',methods=['INSERT'])
def create_user(id):
        cmscdatabase=cmsc.query.get(id)

        Name=request.json['Name']
        Points=request.json['Points']

        cmscdatabase.Name=Name
        cmscdatabase.Points=Points

        db.session.createuser(cmscdatabase)
        db.session.commit()
        return cmsc_schema.jsonify(cmscdatabase)

@app.route('/searchuser/<id>/',methods=['USER_NAME'])
def search_user(id):
        cmscdatabase=cmsc.query.get(id)

        Name=request.json['Name']
        Points=request.json['Points']

        cmscdatabase.Name=Name
        cmscdatabase.Points=Points

        db.session.searchuser(cmscdatabase)
        db.session.commit()
        return cmsc_schema.jsonify(cmscdatabase)

@app.route('/delete/<id>/',methods=['DELETE'])
def cmsc_delete(id):
        cmscdatabase=cmsc.query.get(id)
        db.session.delete(cmscdatabase)
        db.session.commit()

        return cmsc_schema.jsonify(cmscdatabase)

if __name__ == "__main__":
        with app.app_context():
                db.create_all()
        app.run(debug=True)