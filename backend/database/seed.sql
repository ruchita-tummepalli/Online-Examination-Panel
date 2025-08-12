-- Sample data for testing
INSERT INTO users (username, email, password) VALUES 
('teacher1', 'teacher@test.com', '$2a$10$hash_here'),
('admin', 'admin@test.com', '$2a$10$hash_here');

INSERT INTO students (name, email, roll_number, class_name) VALUES 
('John Doe', 'john@test.com', '001', '10A'),
('Jane Smith', 'jane@test.com', '002', '10A'),
('Bob Wilson', 'bob@test.com', '003', '10B');

INSERT INTO exams (title, subject, date, duration, total_marks, teacher_id) VALUES 
('Math Test 1', 'Mathematics', '2024-01-15', 60, 100, 1),
('Science Quiz', 'Science', '2024-01-20', 45, 50, 1);