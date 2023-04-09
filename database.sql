CREATE DATABASE dartdb;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  is_app_admin BOOLEAN DEFAULT FALSE,
  phone_number VARCHAR(50),
  rib VARCHAR(30),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rounds (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  admin_id INTEGER NOT NULL REFERENCES users(id),
  amount INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  invitation_link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE participants (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  round_id INTEGER NOT NULL REFERENCES rounds(id),
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (round_id, user_id)
);



CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  round_id INTEGER NOT NULL REFERENCES rounds(id),
  sender_id INTEGER NOT NULL REFERENCES users(id),
  receiver_id INTEGER NOT NULL REFERENCES users(id),
  amount INTEGER NOT NULL,
  month INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE participant_order (
  id BIGSERIAL PRIMARY KEY,
  round_id INTEGER NOT NULL REFERENCES rounds(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  participant_order INTEGER NOT NULL,
  UNIQUE (round_id, participant_order),
  UNIQUE (round_id, user_id),
  FOREIGN KEY (round_id, user_id) REFERENCES participants(round_id, user_id) ON DELETE CASCADE
);


