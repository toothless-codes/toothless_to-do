from flask import Flask, request, jsonify
from models import db, Task
from datetime import datetime
import os

app = Flask(__name__)

# configure SQLite
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(BASE_DIR, 'db.sqlite3')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify([task.to_dict() for task in tasks])

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    content = data.get('content')
    due_date_str = data.get('due_date')
    due_date = datetime.fromisoformat(due_date_str) if due_date_str else None

    if not content:
        return jsonify({'error': 'Content is required'}), 400

    new_task = Task(content=content, due_date=due_date)
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'})

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404

    data = request.get_json()
    task.content = data.get('content', task.content)
    task.done = data.get('done', task.done)
    due_date_str = data.get('due_date')
    if due_date_str is not None:
        task.due_date = datetime.fromisoformat(due_date_str)
    db.session.commit()
    return jsonify(task.to_dict())

if __name__ == '__main__':
    # ensure tables are created before the first request
    with app.app_context():
        db.create_all()
    app.run(debug=True)
