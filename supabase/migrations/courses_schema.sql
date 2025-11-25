-- Course content table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  icon TEXT,
  color TEXT,
  order_index INTEGER NOT NULL,
  is_locked BOOLEAN DEFAULT FALSE,
  prerequisite_course_id UUID REFERENCES courses(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course modules/lessons table
CREATE TABLE IF NOT EXISTS course_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB NOT NULL, -- Lesson content (text, images, videos, etc.)
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  question_type TEXT CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer')) NOT NULL,
  options JSONB, -- For multiple choice questions
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  points INTEGER DEFAULT 1,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User course progress table
CREATE TABLE IF NOT EXISTS user_course_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  progress_percentage INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- User module progress table
CREATE TABLE IF NOT EXISTS user_module_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  time_spent_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- User quiz attempts table
CREATE TABLE IF NOT EXISTS user_quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  total_points INTEGER NOT NULL,
  answers JSONB NOT NULL, -- User's answers
  passed BOOLEAN NOT NULL,
  attempt_number INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course certificates table
CREATE TABLE IF NOT EXISTS course_certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  final_score INTEGER,
  UNIQUE(user_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_certificates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses (public read)
CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  USING (true);

-- RLS Policies for course_modules (public read)
CREATE POLICY "Anyone can view course modules"
  ON course_modules FOR SELECT
  USING (true);

-- RLS Policies for quiz_questions (public read)
CREATE POLICY "Anyone can view quiz questions"
  ON quiz_questions FOR SELECT
  USING (true);

-- RLS Policies for user_course_progress
CREATE POLICY "Users can view own course progress"
  ON user_course_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own course progress"
  ON user_course_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own course progress"
  ON user_course_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_module_progress
CREATE POLICY "Users can view own module progress"
  ON user_module_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own module progress"
  ON user_module_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own module progress"
  ON user_module_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_quiz_attempts
CREATE POLICY "Users can view own quiz attempts"
  ON user_quiz_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz attempts"
  ON user_quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for course_certificates
CREATE POLICY "Users can view own certificates"
  ON course_certificates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view all certificates" 
  ON course_certificates FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX idx_quiz_questions_module_id ON quiz_questions(module_id);
CREATE INDEX idx_user_course_progress_user_id ON user_course_progress(user_id);
CREATE INDEX idx_user_course_progress_course_id ON user_course_progress(course_id);
CREATE INDEX idx_user_module_progress_user_id ON user_module_progress(user_id);
CREATE INDEX idx_user_module_progress_module_id ON user_module_progress(module_id);
CREATE INDEX idx_user_quiz_attempts_user_id ON user_quiz_attempts(user_id);
CREATE INDEX idx_user_quiz_attempts_module_id ON user_quiz_attempts(module_id);
CREATE INDEX idx_course_certificates_user_id ON course_certificates(user_id);

-- Function to update course progress percentage
CREATE OR REPLACE FUNCTION update_course_progress()
RETURNS TRIGGER AS $$
DECLARE
  total_modules INTEGER;
  completed_modules INTEGER;
  progress_pct INTEGER;
BEGIN
  -- Count total modules for the course
  SELECT COUNT(*) INTO total_modules
  FROM course_modules
  WHERE course_id = NEW.course_id;

  -- Count completed modules for the user
  SELECT COUNT(*) INTO completed_modules
  FROM user_module_progress
  WHERE user_id = NEW.user_id
    AND course_id = NEW.course_id
    AND is_completed = true;

  -- Calculate progress percentage
  IF total_modules > 0 THEN
    progress_pct := (completed_modules * 100) / total_modules;
  ELSE
    progress_pct := 0;
  END IF;

  -- Update user_course_progress
  INSERT INTO user_course_progress (user_id, course_id, progress_percentage, status, started_at)
  VALUES (NEW.user_id, NEW.course_id, progress_pct, 
          CASE WHEN progress_pct = 0 THEN 'not_started'
               WHEN progress_pct = 100 THEN 'completed'
               ELSE 'in_progress' END,
          CASE WHEN progress_pct > 0 THEN NOW() ELSE NULL END)
  ON CONFLICT (user_id, course_id)
  DO UPDATE SET
    progress_percentage = progress_pct,
    status = CASE WHEN progress_pct = 0 THEN 'not_started'
                  WHEN progress_pct = 100 THEN 'completed'
                  ELSE 'in_progress' END,
    completed_at = CASE WHEN progress_pct = 100 THEN NOW() ELSE NULL END,
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update course progress when module progress changes
CREATE TRIGGER trigger_update_course_progress
AFTER INSERT OR UPDATE ON user_module_progress
FOR EACH ROW
EXECUTE FUNCTION update_course_progress();
