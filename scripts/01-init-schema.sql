-- Create movies_shows table
CREATE TABLE IF NOT EXISTS movies_shows (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type ENUM('Movie', 'TV Show') NOT NULL,
  director VARCHAR(255) NOT NULL,
  budget VARCHAR(100),
  location VARCHAR(255),
  duration VARCHAR(100),
  year_time VARCHAR(100),
  poster_url VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_title (title),
  INDEX idx_type (type)
);

-- Insert sample data
INSERT INTO movies_shows (title, type, director, budget, location, duration, year_time, description) VALUES
('Inception', 'Movie', 'Christopher Nolan', '$160M', 'LA, Paris, Tokyo', '148 min', '2010', 'A skilled thief who steals corporate secrets through dream-sharing technology'),
('Breaking Bad', 'TV Show', 'Vince Gilligan', '$3M/ep', 'Albuquerque', '49 min/ep', '2008-2013', 'A high school chemistry teacher turned methamphetamine producer'),
('The Dark Knight', 'Movie', 'Christopher Nolan', '$185M', 'Chicago, Hong Kong', '152 min', '2008', 'Batman faces the Joker, a criminal mastermind'),
('Oppenheimer', 'Movie', 'Christopher Nolan', '$100M', 'New Mexico, Los Alamos', '180 min', '2023', 'The story of American scientist J. Robert Oppenheimer'),
('Stranger Things', 'TV Show', 'The Duffer Brothers', '$8M/ep', 'Atlanta', '50 min/ep', '2016-Present', 'When a young boy disappears, his friends discover secret government experiments');
