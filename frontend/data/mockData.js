
export const users = new Map([
  [1, { id: 1, email: 'student1@example.com', name: 'Student 1', password: 'password1', role: 'student' }],
  [2, { id: 2, email: 'departmentManager@example.com', name: 'Department Manager', password: 'password2', role: 'departmentManager' }],
  [3, { id: 3, email: 'equipmentManager@example.com', name: 'Equipment Manager', password: 'password3', role: 'equipmentManager' }],
  [4, { id: 4, email: 'professor1@example.com', name: 'Professor 1', password: 'password4', role: 'professor' }],
  [5, { id: 5, email: 'professor2@example.com', name: 'Professor 2', password: 'password5', role: 'professor' }],
  [6, { id: 6, email: 'professor3@example.com', name: 'Professor 3', password: 'password6', role: 'professor' }],
  [7, { id: 7, email: 'secretteris1@example.com', name: 'Secretteris 1', password: 'password7', role: 'secretteris' }],
  [8, { id: 8, email: 'secretteris2@example.com', name: 'Secretteris 2', password: 'password8', role: 'secretteris' }],
  [9, { id: 9, email: 'secretteris3@example.com', name: 'Secretteris 3', password: 'password9', role: 'secretteris' }],
  [10, { id: 10, email: 'departmentHead@example.com', name: 'Department Head', password: 'password10', role: 'departmentHead' }],
  [11, { id: 11, email: 'admin@example.com', name: 'Admin', password: 'password11', role: 'admin' }],
  [12, { id: 12, email: 'student12@example.com', name: 'Student 12', password: 'password12', role: 'student' }],
  [13, { id: 13, email: 'student13@example.com', name: 'Student 13', password: 'password13', role: 'student' }],
  [14, { id: 14, email: 'student14@example.com', name: 'Student 14', password: 'password14', role: 'student' }],
  [15, { id: 15, email: 'student15@example.com', name: 'Student 15', password: 'password15', role: 'student' }]
]);

export const documents = new Map([
    [1, {
       title: 'Document 1',
       text: 'This is the text of Document 1.',
       department: 'Computer Science',
       author: 1, // Student 1
       authorizers: 2 // Department Manager
    }],
    [2, {
       title: 'Document 2',
       text: 'This is the text of Document 2.',
       department: 'Mathematics',
       author: 4, // Professor 1
       authorizers: 11 // Admin
    }],
    [3, {
       title: 'Document 3',
       text: 'This is the text of Document 3.',
       department: 'Physics',
       author: 7, // Secretteris 1
       authorizers: 10 // Department Head
    }],
    [16, {
       title: 'Document 16',
       text: 'This is the text of Document 16.',
       department: 'Chemistry',
       author: 12, // Student 12
       authorizers: 10 // Department Head
    }],
    [17, {
       title: 'Document 17',
       text: 'This is the text of Document 17.',
       department: 'Philosophy',
       author: 13, // Student 13
       authorizers: 1 // Student 1
    }],
    [18, {
       title: 'Document 18',
       text: 'This is the text of Document 18.',
       department: 'Linguistics',
       author: 14, // Student 14
      authorizers: 2 // Professor 1
    }],
    [19, {
       title: 'Document 19',
       text: 'This is the text of Document 19.',
       department: 'Anthropology',
       author: 15, // Student 15
       authorizers: 3 // Professor 2
    }],
    [20, {
       title: 'Document 20',
       text: 'This is the text of Document 20.',
       department: 'Geography',
       author: 3, // Student 3
      authorizers: 5 // Professor 3
    }]
    // Add more documents as needed
   ]);

