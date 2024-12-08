CREATE TABLE staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  staff_id VARCHAR(50) NOT NULL
);
-- 插入測試員工資料
INSERT INTO staff (email, password, staff_id)
VALUES
  ('admin@example.com', 'AdminPassword123', 'S001'),
  ('staff1@example.com', 'password456', 'S002'),
  ('staff2@example.com', 'password789', 'S003');
