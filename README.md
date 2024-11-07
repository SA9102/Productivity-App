# Todo App

Stay organised and focused with this simple yet efficient todo application.

This application is not yet complete and is currently being developed on.

![preview2](https://github.com/user-attachments/assets/20d9623a-6d12-43e4-8a1f-6a45fcca407c)



## Features

- Create todo items
- A todo item has a name and a priority. It can also optionally have further descriptions, and can also belong to a category
- Can edit todo items, check them off, and delete them

Beware that this application is not yet responsive for smaller devices, though I plan to make it so.

## Upcoming Features

This project is currently in development. Here are a few features I plan to add:

- Create new categories
- Sort todo items by priority
- Order todo items by name, category etc.
- Start and end date
- Or, start date with no end date (i.e. ongoing task)
- End date with no start date (i.e. a deadline)
- Responsiveness for smaller devices

## Tech Stack

- TypeScript
- React

I am fairly new to TypeScript, so usage of TypeScript is limited. I have used it to define the 'type' of a todo item, as well as the type of props for different components.

React context is used to allow todo items to access the functions that manipulate its own objects in state, avoiding prop drilling.

## Dependencies

- [react-modal](https://www.npmjs.com/package/react-modal)

## Update Log

### 7th November 2024

- Repository created and first commit.
