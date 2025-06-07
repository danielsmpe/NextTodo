'use client';

import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Todo = {
  id: string;
  name: string;
  status: 'pending' | 'done';
  date: string;
  description: string;
  label: string;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [form, setForm] = useState<Omit<Todo, 'id'>>({
    name: '',
    status: 'pending',
    date: '',
    description: '',
    label: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!form.name) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      ...form,
    };
    setTodos([newTodo, ...todos]);
    setForm({ name: '', status: 'pending', date: '', description: '', label: '' });
  };

  const handleToggleStatus = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, status: todo.status === 'done' ? 'pending' : 'done' } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.status === 'done').length;
  const progress = todos.length ? (completedCount / todos.length) * 100 : 0;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
          <div className="flex items-center gap-2 px-4 ml-auto">
            <p className="text-lg font-bold">NextTodo</p>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Summary Cards */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Today</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{todos.length} tasks</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{completedCount} done</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} />
              </CardContent>
            </Card>
          </div>

          {/* Add Todo Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-fit self-start">+ Add Todo</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Todo</DialogTitle>
              </DialogHeader>

              <div className="grid gap-2">
                <Input
                  placeholder="Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                />
                <Input
                  placeholder="Label"
                  value={form.label}
                  onChange={e => setForm({ ...form, label: e.target.value })}
                />
                <Input
                  placeholder="Description"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
                <Button onClick={handleAdd}>Add</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Task List */}
          <Card className="p-4 bg-muted/50">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="done">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mt-4 space-y-4">
              {todos.map(todo => (
                <Card key={todo.id} className="p-4 flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={todo.status === 'done'}
                        onCheckedChange={() => handleToggleStatus(todo.id)}
                      />
                      <p
                        className={
                          todo.status === 'done' ? 'line-through text-muted-foreground' : ''
                        }
                      >
                        {todo.name}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{todo.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {todo.date} • {todo.label}
                    </p>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(todo.id)}>
                    Delete
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
