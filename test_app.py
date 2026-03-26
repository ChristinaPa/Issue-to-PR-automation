"""Unit tests for the sample task manager application."""

import pytest
from app import add_task, complete_task, list_tasks


def test_add_task():
    tasks = []
    task = add_task(tasks, "Do something")
    assert task["title"] == "Do something"
    assert task["done"] is False
    assert task["id"] == 1
    assert len(tasks) == 1


def test_add_multiple_tasks():
    tasks = []
    add_task(tasks, "First")
    add_task(tasks, "Second")
    assert len(tasks) == 2
    assert tasks[1]["id"] == 2


def test_complete_task():
    tasks = []
    add_task(tasks, "Finish report")
    result = complete_task(tasks, 1)
    assert result is True
    assert tasks[0]["done"] is True


def test_complete_nonexistent_task():
    tasks = []
    add_task(tasks, "Some task")
    result = complete_task(tasks, 99)
    assert result is False


def test_list_tasks_empty(capsys):
    list_tasks([])
    captured = capsys.readouterr()
    assert "No tasks yet" in captured.out


def test_list_tasks_shows_status(capsys):
    tasks = []
    add_task(tasks, "Pending task")
    add_task(tasks, "Done task")
    complete_task(tasks, 2)
    list_tasks(tasks)
    captured = capsys.readouterr()
    assert "○" in captured.out   # pending
    assert "✓" in captured.out   # done
