-- Sample Course Data for Paideia
-- This script populates the course system with sample content

-- Insert Leadership Foundations Course
INSERT INTO courses (title, description, category, duration_minutes, difficulty, icon, color, order_index, is_locked)
VALUES (
  'Leadership Foundations',
  'Develop core leadership skills essential for fellowship success. Learn the principles of effective leadership, team building, and inspiring others.',
  'Leadership',
  120,
  'beginner',
  'Users',
  'blue',
  1,
  false
) RETURNING id;

-- Store the course ID (you'll need to replace COURSE_ID_1 with actual UUID after running)
-- For now, we'll use a variable approach

DO $$
DECLARE
  course_id_1 UUID;
  module_id_1 UUID;
  module_id_2 UUID;
  module_id_3 UUID;
BEGIN
  -- Insert Leadership Foundations Course
  INSERT INTO courses (title, description, category, duration_minutes, difficulty, icon, color, order_index, is_locked)
  VALUES (
    'Leadership Foundations',
    'Develop core leadership skills essential for fellowship success. Learn the principles of effective leadership, team building, and inspiring others.',
    'Leadership',
    120,
    'beginner',
    'Users',
    'blue',
    1,
    false
  ) RETURNING id INTO course_id_1;

  -- Module 1: Introduction to Leadership
  INSERT INTO course_modules (course_id, title, description, content, order_index, duration_minutes)
  VALUES (
    course_id_1,
    'Introduction to Leadership',
    'Understanding what makes a great leader and the foundations of effective leadership',
    jsonb_build_object(
      'type', 'lesson',
      'sections', jsonb_build_array(
        jsonb_build_object(
          'type', 'text',
          'title', 'What is Leadership?',
          'content', 'Leadership is not about being in charge. It is about taking care of those in your charge. True leadership is about inspiring and empowering others to achieve their full potential while working towards a common goal.'
        ),
        jsonb_build_object(
          'type', 'callout',
          'callout_type', 'tip',
          'title', 'Key Insight',
          'content', 'Great leaders inspire action through their vision and values, not through authority or control.'
        ),
        jsonb_build_object(
          'type', 'text',
          'title', 'The Leadership Mindset',
          'content', 'Effective leaders possess a growth mindset. They see challenges as opportunities for learning and development, both for themselves and their teams. They are committed to continuous improvement and lifelong learning.'
        ),
        jsonb_build_object(
          'type', 'list',
          'title', 'Core Leadership Qualities',
          'items', jsonb_build_array(
            'Integrity: Being honest and having strong moral principles',
            'Vision: Having a clear picture of where you want to go',
            'Empathy: Understanding and sharing the feelings of others',
            'Courage: The ability to do something that frightens you',
            'Resilience: The capacity to recover quickly from difficulties'
          )
        ),
        jsonb_build_object(
          'type', 'callout',
          'callout_type', 'info',
          'title', 'Remember',
          'content', 'Leadership is a journey, not a destination. Every day presents new opportunities to grow and improve as a leader.'
        )
      )
    ),
    1,
    15
  ) RETURNING id INTO module_id_1;

  -- Quiz for Module 1
  INSERT INTO quiz_questions (module_id, question, question_type, options, correct_answer, explanation, points, order_index)
  VALUES
    (
      module_id_1,
      'What is the primary role of a leader according to this lesson?',
      'multiple_choice',
      jsonb_build_array(
        'To give orders and maintain control',
        'To inspire and empower others',
        'To make all the decisions',
        'To be the smartest person in the room'
      ),
      'To inspire and empower others',
      'Leadership is about inspiring and empowering others to achieve their full potential, not about control or authority.',
      1,
      1
    ),
    (
      module_id_1,
      'True leaders possess a growth mindset.',
      'true_false',
      NULL,
      'True',
      'A growth mindset is essential for effective leadership as it enables continuous learning and development.',
      1,
      2
    ),
    (
      module_id_1,
      'Which of the following is NOT mentioned as a core leadership quality?',
      'multiple_choice',
      jsonb_build_array(
        'Integrity',
        'Empathy',
        'Aggression',
        'Resilience'
      ),
      'Aggression',
      'Aggression is not a positive leadership quality. The core qualities mentioned are integrity, vision, empathy, courage, and resilience.',
      1,
      3
    );

  -- Module 2: Building Trust and Credibility
  INSERT INTO course_modules (course_id, title, description, content, order_index, duration_minutes)
  VALUES (
    course_id_1,
    'Building Trust and Credibility',
    'Learn how to establish and maintain trust with your team and stakeholders',
    jsonb_build_object(
      'type', 'lesson',
      'sections', jsonb_build_array(
        jsonb_build_object(
          'type', 'text',
          'title', 'The Foundation of Leadership: Trust',
          'content', 'Trust is the foundation of all effective leadership. Without trust, even the most brilliant strategies and visions will fail. Trust is built through consistent actions, transparency, and genuine care for others.'
        ),
        jsonb_build_object(
          'type', 'callout',
          'callout_type', 'warning',
          'title', 'Important',
          'content', 'Trust takes years to build, seconds to break, and forever to repair. Protect it carefully.'
        ),
        jsonb_build_object(
          'type', 'list',
          'title', 'How to Build Trust',
          'items', jsonb_build_array(
            'Be consistent in your words and actions',
            'Communicate openly and honestly',
            'Admit when you make mistakes',
            'Follow through on your commitments',
            'Show genuine interest in others',
            'Give credit where credit is due'
          )
        ),
        jsonb_build_object(
          'type', 'text',
          'title', 'Credibility Through Competence',
          'content', 'Credibility comes from demonstrating competence in your field while remaining humble and open to learning. It means being knowledgeable without being arrogant, and confident without being dismissive of others'' ideas.'
        ),
        jsonb_build_object(
          'type', 'callout',
          'callout_type', 'success',
          'title', 'Pro Tip',
          'content', 'The fastest way to build credibility is to help others succeed. When you invest in your team''s growth, they invest in your vision.'
        )
      )
    ),
    2,
    20
  ) RETURNING id INTO module_id_2;

  -- Quiz for Module 2
  INSERT INTO quiz_questions (module_id, question, question_type, options, correct_answer, explanation, points, order_index)
  VALUES
    (
      module_id_2,
      'Trust is the foundation of effective leadership.',
      'true_false',
      NULL,
      'True',
      'Trust is absolutely fundamental to leadership. Without it, leaders cannot inspire or influence others effectively.',
      1,
      1
    ),
    (
      module_id_2,
      'What should you do when you make a mistake as a leader?',
      'multiple_choice',
      jsonb_build_array(
        'Hide it and hope no one notices',
        'Blame someone else',
        'Admit it openly and learn from it',
        'Make excuses for why it happened'
      ),
      'Admit it openly and learn from it',
      'Admitting mistakes builds trust and credibility. It shows integrity and creates a culture where learning from failures is encouraged.',
      1,
      2
    ),
    (
      module_id_2,
      'According to the lesson, what is the fastest way to build credibility?',
      'multiple_choice',
      jsonb_build_array(
        'Showing off your achievements',
        'Helping others succeed',
        'Being the loudest voice in the room',
        'Never admitting you''re wrong'
      ),
      'Helping others succeed',
      'When you invest in your team''s growth and help them succeed, they naturally invest in your vision and trust your leadership.',
      1,
      3
    );

  -- Module 3: Effective Communication
  INSERT INTO course_modules (course_id, title, description, content, order_index, duration_minutes)
  VALUES (
    course_id_1,
    'Effective Communication',
    'Master the art of clear, persuasive, and empathetic communication',
    jsonb_build_object(
      'type', 'lesson',
      'sections', jsonb_build_array(
        jsonb_build_object(
          'type', 'text',
          'title', 'Communication: The Leader''s Most Important Tool',
          'content', 'Communication is the lifeblood of leadership. Your ability to articulate your vision, provide feedback, and listen actively determines your effectiveness as a leader. Great communicators don''t just speak well—they listen even better.'
        ),
        jsonb_build_object(
          'type', 'list',
          'title', 'The 3 Pillars of Effective Communication',
          'items', jsonb_build_array(
            'Clarity: Say what you mean in simple, direct language',
            'Empathy: Understand your audience and their perspective',
            'Consistency: Ensure your message aligns with your actions'
          )
        ),
        jsonb_build_object(
          'type', 'callout',
          'callout_type', 'tip',
          'title', 'Active Listening',
          'content', 'Listen to understand, not to respond. Give your full attention, ask clarifying questions, and reflect back what you''ve heard.'
        ),
        jsonb_build_object(
          'type', 'text',
          'title', 'Giving Constructive Feedback',
          'content', 'Effective feedback is specific, timely, and focused on behavior rather than personality. It should be delivered with the intent to help the person grow, not to criticize or diminish them.'
        ),
        jsonb_build_object(
          'type', 'list',
          'title', 'Feedback Best Practices',
          'items', jsonb_build_array(
            'Be specific about what you observed',
            'Focus on the impact of the behavior',
            'Offer suggestions for improvement',
            'End with encouragement and support',
            'Follow up to track progress'
          )
        )
      )
    ),
    3,
    25
  ) RETURNING id INTO module_id_3;

  -- Quiz for Module 3
  INSERT INTO quiz_questions (module_id, question, question_type, options, correct_answer, explanation, points, order_index)
  VALUES
    (
      module_id_3,
      'What is the most important aspect of communication for leaders?',
      'multiple_choice',
      jsonb_build_array(
        'Speaking loudly and confidently',
        'Using complex vocabulary',
        'Listening actively',
        'Talking more than others'
      ),
      'Listening actively',
      'Great communicators listen even better than they speak. Active listening builds trust and understanding.',
      1,
      1
    ),
    (
      module_id_3,
      'Effective feedback should focus on behavior rather than personality.',
      'true_false',
      NULL,
      'True',
      'Focusing on specific behaviors makes feedback more actionable and less personal, leading to better outcomes.',
      1,
      2
    ),
    (
      module_id_3,
      'Which of the following is NOT one of the 3 Pillars of Effective Communication?',
      'multiple_choice',
      jsonb_build_array(
        'Clarity',
        'Empathy',
        'Consistency',
        'Complexity'
      ),
      'Complexity',
      'The three pillars are Clarity, Empathy, and Consistency. Complexity is not a positive communication trait.',
      1,
      3
    );

  -- Insert Systems Thinking Course
  INSERT INTO courses (title, description, category, duration_minutes, difficulty, icon, color, order_index, is_locked, prerequisite_course_id)
  VALUES (
    'Systems Thinking Essentials',
    'Learn to analyze complex problems and design innovative solutions using systems thinking principles.',
    'Critical Thinking',
    90,
    'intermediate',
    'Brain',
    'purple',
    2,
    false,
    course_id_1
  );

  -- Insert Global Citizenship Course
  INSERT INTO courses (title, description, category, duration_minutes, difficulty, icon, color, order_index, is_locked)
  VALUES (
    'Global Citizenship',
    'Understand global challenges and your role in creating positive change in the world.',
    'Global Awareness',
    150,
    'beginner',
    'Globe',
    'green',
    3,
    false
  );

END $$;
