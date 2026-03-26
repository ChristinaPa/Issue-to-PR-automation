"""
Sample Python application: a simple task manager (to-do list).
"""

def add_task(tasks: list, title: str) -> dict:
    """Add a new task to the list."""
    task = {"id": len(tasks) + 1, "title": title, "done": False}
    tasks.append(task)
    return task


def complete_task(tasks: list, task_id: int) -> bool:
    """Mark a task as done. Returns True if found, False otherwise."""
    for task in tasks:
        if task["id"] == task_id:
            task["done"] = True
            return True
    return False


def list_tasks(tasks: list) -> None:
    """Print all tasks with their status."""
    if not tasks:
        print("No tasks yet.")
        return
    for task in tasks:
        status = "✓" if task["done"] else "○"
        print(f"  [{status}] {task['id']}. {task['title']}")


def main() -> None:
    tasks: list = []

    add_task(tasks, "Buy groceries")
    add_task(tasks, "Write unit tests")
    add_task(tasks, "Read a book")

    print("=== Task Manager ===")
    print("\nAll tasks:")
    list_tasks(tasks)

    complete_task(tasks, 1)
    print("\nAfter completing task 1:")
    list_tasks(tasks)


if __name__ == "__main__":
    main()
