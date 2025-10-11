package com.example.todoapp;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*") // allows frontend access
@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoRepository repository;

    public TodoController(TodoRepository repository) {
        this.repository = repository;
    }

    // READ - Get all todos
    @GetMapping
    public List<Todo> getAllTodos() {
        return repository.findAll();
    }

    // CREATE - Add new todo
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return repository.save(todo);
    }

    // UPDATE - Edit existing todo
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        return repository.findById(id)
                .map(todo -> {
                    todo.setTitle(updatedTodo.getTitle());
                    return repository.save(todo);
                })
                .orElseGet(() -> {
                    updatedTodo.setId(id);
                    return repository.save(updatedTodo);
                });
    }

    // DELETE - Remove todo
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
